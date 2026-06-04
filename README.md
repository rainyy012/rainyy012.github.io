# https://rainyy012.github.io

[![CodeQL Advanced](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/codeql.yml/badge.svg)](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/codeql.yml)<br />
[![GitHub Pages](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/gh-pages.yml)<br />
[![Pages Build Deployment](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/rainyy012/rainyy012.github.io/actions/workflows/pages/pages-build-deployment)<br />

## Installation

```bash
pnpm install
```

## Local Development

```bash
pnpm run start
```

This command starts a local development server (at port 3000 by default).
Most changes are reflected live without having to restart the server.

## Build

```bash
pnpm run build
```

This command generates static content into the `build` directory and can be served locally by running:

```bash
pnpm run serve
```

## Contribution Guide

Please clone or fork from the `dev` branch.

- For forks, it is fine to keep the branch name as `dev`
- For clones, it is preferred that the branch names use one of the following prefixes:

| Prefix      | Usage                 | Example                       |
| ----------- | --------------------- | ----------------------------- |
| `dev-`      | General development   | `dev-custom-markdown-wrapper` |
| `fix-`      | Bug-fixing            | `fix-broken-export`           |
| `doc`       | Documentation-related | `doc-update-readme`           |
| `refactor-` | Code refactoring      | `refactor-env-variables`      |


Commits should be in lowercase and use one of the prefixes below:

| Prefix     | Usage                                          | Example                                 |
| ---------- | ---------------------------------------------- | --------------------------------------- |
| `fix`      | Bug-fixing                                     | `fix: broken export`                    |
| `chore`    | Tasks that don't change how the site functions | `chore: added codeql advanced workflow` |
| `feat`     | Feature-related                                | `feat: added footer tip link`           |
| `doc`      | Documentation-related                          | `doc: updated readme`                   |
| `refactor` | Code refactoring                               | `refactor: env variables`               |

Other internally reserved prefixes (please do not use):

| Prefix | Usage                         | Example                                            |
| ------ | ----------------------------- | -------------------------------------------------- |
| `bulk` | Miscellaneous bulk operations | `bulk: fixed false build warnings, ux refinements` |
| `blog` | New post creation             | `blog: hello world`                                |

Lastly, when creating create pull requests, please set `dev` as the branch target.
