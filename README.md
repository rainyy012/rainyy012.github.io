# Website

This site is available at https://rainyy012.github.io

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Contribution Guide
- Please clone the `dev` branch and create pull requests that merge back into the `dev` branch
- Commits should be in lowercase and use one of the prefixes below:

| Prefix   | Usage                                          | Example                                 |
| -------- | ---------------------------------------------- | --------------------------------------- |
| fix      | Bug-fixing                                     | `fix: broken export`                    |
| chore    | Tasks that don't change how the site functions | `chore: added codeql advanced workflow` |
| feat     | Feature-related                                | `feat: added footer tip link`           |
| doc      | Documentation-related                          | `doc: updated readme`                   |
| refactor | Code refactoring                               | `refactor: env variables`               |

Other internally reserved prefixes (please do not use):
| Prefix | Usage                         | Example                                            |
| ------ | ----------------------------- | -------------------------------------------------- |
| bulk   | Miscellaneous bulk operations | `bulk: fixed false build warnings, ux refinements` |
| post   | New post creation             | `post: hello world`                                |
