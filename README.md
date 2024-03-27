# Lethean Server
[![lethean-server](https://github.com/dAppServer/server/actions/workflows/compile.yml/badge.svg)](https://github.com/dAppServer/server/actions/workflows/compile.yml)
[![Coverage Status](https://coveralls.io/repos/github/dAppServer/server/badge.svg?branch=main)](https://coveralls.io/github/dAppServer/server?branch=main)

Clientside PWA server written using [Danet](https://danet.land/) and [Deno](https://deno.land/) for [Lethean VPN](https://lt.hn/) Web3 apps, 

When porting app's for the web to desktop, this project provides a server 
that can be used to host your app's backend on the client machine.

It enables a webapp to run as a standalone desktop app, with the backend running on the client machine.
Using typical HTTP/REST API's, the app can communicate with the backend server to access files, data, sqlite.

It is written in Deno, a secure runtime for JavaScript and TypeScript.
It is designed to be easy to use and secure by default.

It can be run as just a backend service, or as a full desktop app with a frontend served by the backend.

We use this with GoLang for desktop as a backend server for an Angular app and a frontend for our docker container admin ui's.

It will by default run on localhost:36911 alowing multiple configurations for both server and clientside use cases

## Install
    
```shell
deno install -A -f -n lthn --unstable https://deno.land/x/lthn/mod.ts
```

## Services

- `const fs = new ModIoFsLocalService();`
- `const crypt = new ModCryptService();`
- `const salt = new QuasiSaltService();`
- `const openpgp = new OpenPGPService(fs, salt);`
- `const sqlite = new ModIoStorageDatabaseSqliteService();`
- `const process = new ProcessService();`
- `const docker = new DockerService();`

# Development setup

## Install (Automatic)



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
