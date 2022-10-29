# Lethean Server

Clientside PWA server mainly used within a GUI application but can be used to run a local internet accessible server (at your risk)


## Local build

```shell
git clone https://github.com/dAppServer/server.git
cd server
make run
```

## Build commands

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
