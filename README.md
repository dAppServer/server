# Lethean Server

Clientside PWA server mainly used within a GUI application but can be used to run a local internet accessible server (at your risk)

We use Deno which is a TypeScript runtime built with Rust and TypeScript, there is no nodeJS runtime but you can use some packages as there is compatability.

- Deno Documentation: https://deno.land/manual/introduction 
- Deno API Reference: https://deno.land/api 
- Deno Standard Library: https://deno.land/std?doc

Deno packages, adding a new package is fine, but please run `make vendor` whenever a new package is added,
this is because the `./vendor` folder has a code copy so that the system can be loaded with the below command.

`deno run https://raw.githubusercontent.com/dAppServer/server/main/mod.ts`

# Development setup

## Install (Automatic)

When using the Make system Deno is installed automatically relative to this folder into a folder `./third_party`
you can also install it by running the tests with `make test`

## Install Deno (Manual not needed if using Makefile)

Linux/MacOS:`curl -fsSL https://deno.land/install.sh | sh` \
PowerShell(Windows): `irm https://deno.land/install.ps1 | iex` \
Homebrew (Mac): `brew install deno`

```shell
git clone https://github.com/dAppServer/server.git
cd server
make run
```

## Build commands

We use Make as many people know this and means you dont need to remember command flags;

Dependencies need to be listed in `./deps.ts`

```shell
 make build-linux                    Build binary for Linux
 make build-macos-arm                Build binary for macOS Arm
 make build-macos                    Build binary for macOS Intel
 make build-windows                  Build binary for Windows x86_64
 make build                          Build binary for the host machine
 make fmt                            Format code
 make help                           Show this help
 make run                            Run Server
 make test-apps                      Run Testsuite: apps
 make test-auth                      Run Testsuite: Auth
 make test-crypt                     Run Testsuite: Crypt
 make test-docker                    Run Testsuite: Docker
 make test-io                        Run Testsuite: IO
 make test-rest                      Run Testsuite: REST
 make test-xmrig                     Run Testsuite: xmrig
 make test                           Run full testsuite
 make vendor                         Update Vendor bundle
```

# Application API's / Services

- Static File Server
- Filesystem Service
- Download Service
- Process Manager
- Process stdIn/stdOut ZeroMQ WebSocket
- OpenPGP / CryptPkcs8 / QuasiSalt
- Json object store
- `.ini` service
- handlebars based Config file generator 
- Package manager to install 3rd party PWAs


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
