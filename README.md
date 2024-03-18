# Lethean Server
[![lethean-server](https://github.com/dAppServer/server/actions/workflows/compile.yml/badge.svg)](https://github.com/dAppServer/server/actions/workflows/compile.yml)
[![Coverage Status](https://coveralls.io/repos/github/dAppServer/server/badge.svg?branch=main)](https://coveralls.io/github/dAppServer/server?branch=main)

Clientside PWA server written using [Danet](https://danet.land/) and [Deno](https://deno.land/)

This server is designed to be a secure and private server for running PWA's and other services.

## Requirements

- [Deno](https://deno.land/)
- [Danet](https://danet.land/)
- [Make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Features

- [x] Static File Server
- [x] Filesystem Service
- [x] Download Service
- [x] Process Manager
- [x] Process stdIn/stdOut ZeroMQ WebSocket
- [x] OpenPGP / CryptPkcs8 / QuasiSalt
- [x] Json object store
- [x] `.ini` service
- [x] handlebars based Config file generator
- [x] Package manager to install 3rd party apps
- [x] Docker container control
- [x] REST API
- [x] Websocket API


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
## Deno Tasks

```shell
deno task dev-server
deno task test
deno task compile
deno task compile-lin
deno task compile-lin-arm
deno task compile-mac
deno task compile-mac-m1
deno task compile-win

```

## Make commands

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
