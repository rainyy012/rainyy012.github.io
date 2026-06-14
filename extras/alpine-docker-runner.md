# Setting Up Forgejo Runner in Alpine (Docker)

<!-- cspell:words apk apks cdrom daem dind openrc -->

This setup should work even if Alpine is installed directly in a physical host,
but this guide proceeds with the assumption that Alpine will be installed in a virtual machine.
For example: UTM, Parallels, etc.

This guide also assumes prepared knowledge of:
- Setting up Alpine using using the `setup-alpine` command;
- Using the `apk` (Alpine Package Keeper) command in Alpine;
- Generating and using SSH keys;
- Using `vi` (or other equivalent software) to edit the necessary config files.

Setup hierarchy:
```md
- Host Machine
  - Virtual Machine (Alpine)
    - Docker
```

## Alpine Setup

- Download Alpine image from https://www.alpinelinux.org/downloads
- Run `setup-alpine` to begin setup.
- When prompted to enter SSH key, enter the SSH key of **Host Machine**.

After setup is complete, update the repository list at `/etc/apk/repositories`:
```diff
  #/media/cdrom/apks
  http://dl-cdn.alpinelinux.org/alpine/v3.23/main
- #http://dl-cdn.alpinelinux.org/alpine/v3.23/community
+ http://dl-cdn.alpinelinux.org/alpine/v3.23/community
```

Install necessary packages:
```sh
apk add --update docker docker-cli-compose openrc
```

Notes:
- `docker` and `docker-cli-compose` are necessary Docker components for this setup.
- `openrc` is a service manager (similar to `systemctl` mentioned in Docker's post-installation steps).

## Docker Setup

Configure Docker to start on boot:
```sh
rc-update add docker boot
```

Start the Docker service for the first time:
```sh
service docker start
```

(Optional) Check if Docker is set up correctly and running:
```sh
docker run hello-world
```

Notes:
- `sudo` is not required when running `docker run hello-world` in Alpine since we are already logged in as `root`.
- Setting up user group is not necessary (as mentioned in the [post-installation guide](https://docs.docker.com/engine/install/linux-postinstall#manage-docker-as-a-non-root-user)) for the same reason.
- Hint: `docker -v` and `docker ps -a` could come in handy also


Configure the default logging driver:
```sh
mkdir -p /etc/docker
vi /etc/docker/daemon.json
```

Then, populate the JSON file with the following contents:
```json
{
  "log-driver": "local"
}
```

The `local` driver has built-in log rotation, which is necessary to avoid the
default driver (`json-file`, which does not have log rotation enabled by default)
from exhausting the disk resources.

Feel free to set the value to `"none"` to completely disable logs and/or
add other configurations based on customization necessities.

## Setup Working Directory

Prepare a working directory that look like this:
```md
- forgejo-runner/
  - data/
    - .cache/
    - runner-config.yml (ignore for now, automatically generated later)
  - docker-compose.yml (see below)
```

Add these to `docker-compose.yml`:
```yml
# version: '3.8' # Deprecated field, kept for reference

services:
  docker-in-docker:
    image: docker:dind
    container_name: 'docker_dind'
    privileged: 'true'
    command: ['dockerd', '-H', 'tcp://0.0.0.0:2375', '--tls=false']
    restart: 'unless-stopped'

  forgejo-runner:
    image: 'data.forgejo.org/forgejo/runner:12'
    links:
      - docker-in-docker
    depends_on:
      docker-in-docker:
        condition: service_started
    container_name: 'forgejo-runner'
    environment:
      DOCKER_HOST: tcp://docker-in-docker:2375
    user: 1001:1001
    volumes:
      - ./data:/data
    restart: 'unless-stopped'
    command: 'forgejo-runner daemon --config runner-config.yml'
```

Prepare `data` directory with non-root permissions:
```sh
chown -R 1001:1001 data
chmod 775 data/.cache
chmod g+s data/.cache
```

`user: 1001:1001` in `docker-compose.yml` grants access to `./data`, but without root privileges. It is somehow necessary even though everything runs from the `root` account in Alpine.

If not, it is very likely to hit his error when running an Action:
> fatal: could not create leading directories of '/data/.cache/act/... exit status 128

## Setup Forgejo Runner

To setup forgejo runner:
```sh
docker run --rm data.forgejo.org/forgejo/runner:12 forgejo-runner --version forgejo-runner version v12.7.2
```

To generate `runner-config.yml` (that was mentioned earlier):
```sh
docker run --rm data.forgejo.org/forgejo/runner:12 \
forgejo-runner generate-config > data/runner-config.yml
```

### Configuring The Runner

Modify `runner-config.yml` with the following changes:

#### Labels

```diff
  runner:
-   labels: []
+   labels: [<NAME>:docker://docker.io/library/node:lts]
```

Then, replace `<NAME>` with a string value that's easy to remember.

Example: `custom:docker://docker.io/library/node:lts`

Reference: https://forgejo.org/docs/latest/admin/actions/configuration/#choosing-labels

#### Connections

```diff
  connections:
+     forgejo:
+       url: https://codeberg.org/
+       uuid: "<UUID>"
+       token: "<TOKEN>"
```

Then, replace `<UUID>` and `<TOKEN>` with the values provided when creating a runner.

Hint: To create a new runner, go to:
https://codeberg.org/user/settings/actions/runners/new

## Start The Docker Container

Start the runner (docker compose in detached mode):
```sh
docker compose up -d
```

(Optional) To see all Docker containers:
```sh
docker ps -a
```

If everything is set up properly, there should be exactly 2 containers, with names `runner` and `docker_dind` respectively:
```
CONTAINER ID   IMAGE                                COMMAND                  CREATED                  STATUS                  PORTS           NAMES
50307280cd8d   data.forgejo.org/forgejo/runner:12   "forgejo-runner daem…"   Less than a second ago   Up Less than a second                   runner
8ab492c3d424   docker:dind                          "dockerd-entrypoint.…"   Less than a second ago   Up Less than a second   2375-2376/tcp   docker_dind
```

## Troubleshooting

### Runner is online but labels are not showing
- Open `runner-config.yml` and check if `labels` is indented properly.
- It should be nested under `runner`.
- In case `labels` have been accidentally "de-indented", `forgejo-runner` will not throw an error and simply assumes that no label has been provided.

### TLS handshake timeout

In case of error such as:
> error: Put "https://username.codeberg.page": net/http: TLS handshake timeout
> ⚙️ [runner]: exit with `FAILURE`: 1

It might be due to:
- Poor network conditions, or
- Not enough computing power (try increasing the CPU core count for the virtual machine), or
- Docker's MTU (default=1500b) ends up being too high (try changing to 1450)

Example of `/etc/docker/daemon.json` after updating:
```json
{
  "log-driver": "local",
  "mtu": 1450
}
```

It doesn't seem like any of the solutions mentioned above actually fix the issue because the results are very flaky. For example, on one attempt after increasing CPU count, the workflow completes successfully, on second attempt, the TLS handshake timeout occurs again.
