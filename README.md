# Lethean Server

This repository is a mess, but it's a mess I made working the problem, when I
write tests, it'll be sensible.

## Dev Commands

```text
 make build-linux                    Build binary for Linux
 make build-macos-arm                Build binary for macOS Arm
 make build-macos                    Build binary for macOS Intel
 make build-windows                  Build binary for Windows x86_64
 make build                          Build binary for the host machine
 make help                           Show this help
 make test-apps                      Run Testsuite: apps
 make test-auth                      Run Testsuite: Auth
 make test-crypt                     Run Testsuite: Crypt
 make test-docker                    Run Testsuite: Docker
 make test-io                        Run Testsuite: IO
 make test-rest                      Run Testsuite: REST
 make test-xmrig                     Run Testsuite: xmrig
 make test                           Run full testsuite

```

- Build Status:
  [![lethean-server](https://github.com/dAppServer/server/actions/workflows/compile.yml/badge.svg)](https://github.com/dAppServer/server/actions/workflows/compile.yml)
- Test Coverage:
  [![Coverage Status](https://coveralls.io/repos/github/dAppServer/server/badge.svg?branch=main)](https://coveralls.io/github/dAppServer/server?branch=main)
## Requirements

1. Deno https://deno.land
2. Lethean data directory `$HOME/Lethean`

## Development Server

```shell
deno run --reload --allow-all --unstable https://raw.githubusercontent.com/letheanVPN/lethean-server/main/mod.ts
```
https://hub.docker.com/r/lthn/server

`docker pull lthn/server:latest`

## documentation

```shell
cd docs
pip install mkdocs-material mkdocs-git-revision-date-localized-plugin pillow cairosvg
mkdocs serve
```
