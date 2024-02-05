DENO_VERSION := 1.34.2
DENO_INSTALL := third_party

ifeq ($(OS),Windows_NT)
    HOST=windows
    CLI_SUFFIX=.exe
    TEST_DIR=test\\
else
    HOST_S := $(shell uname -s)
    TEST_DIR=test/
    ifeq ($(HOST_S),Linux)
        HOST=linux

    endif
    ifeq ($(HOST_S),Darwin)
        HOST +=macos
    endif
    HOST_P := $(shell uname -p)
    ifeq ($(HOST_P),x86_64)
        ARCH=amd64
    endif
    ifneq ($(filter %86,$(HOST_P)),)
        ARCH=i386
    endif
    ifneq ($(filter arm%,$(HOST_P)),)
        ARCH=arm
    endif
endif

include deno.mk

.PHONY: all run build test test-apps test-auth test-crypt test-docker test-io test-rest test-xmrig help fmt vendor
all: help

run: $(DENO_BIN) ## Run Server
	$(call deno,run -A -c deno.json --unstable mod.ts)

vendor:  $(DENO_BIN) ## Update Vendor bundle
	$(call deno,vendor -f mod.ts deps.ts deps-test.ts)

fmt: $(DENO_BIN) ## Format code
	$(call deno,fmt -c deno.json --import-map vendor/import_map.json)

bundle: $(DENO_BIN) ## Bundle code
	$(call deno,bundle --unstable mod.ts bundle.js)

build-sdk-typescript-angular: ## SDK Build: Angular
	bash docs/build-sdk.sh -p typescript-angular

build-sdk-typescript: ## SDK Build: TypeScript
	bash docs/build-sdk.sh -p typescript

build: $(DENO_BIN) bundle ## Build binary for the host machine
	$(call deno,compile -A --unstable --output build/lthn bundle.js)

build-linux: $(DENO_BIN) bundle ## Build binary for Linux
	$(call deno,compile -A --unstable --output build/lthn --target x86_64-unknown-linux-gnu bundle.js)

build-windows: $(DENO_BIN) bundle ## Build binary for Windows x86_64
	$(call deno,compile -A --unstable --output build/lthn --target x86_64-pc-windows-msvc bundle.js)

build-macos: $(DENO_BIN) bundle ## Build binary for macOS Intel
	$(call deno,compile -A --unstable --output build/lthn --target x86_64-apple-darwin bundle.js)

build-macos-arm: $(DENO_BIN) bundle ## Build binary for macOS Arm
	$(call deno,compile -A --unstable --output build/lthn --target aarch64-apple-darwin bundle.js)


test: $(DENO_BIN) ## Run full testsuite
	$(call deno,test -A --unstable --import-map vendor/import_map.json $(TEST_DIR))

test-apps: $(DENO_BIN) ## Run Testsuite: apps
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)apps)

test-auth: $(DENO_BIN) ## Run Testsuite: Auth
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)auth)

test-crypt: $(DENO_BIN) ## Run Testsuite: Crypt
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)crypt)

test-docker: $(DENO_BIN) ## Run Testsuite: Docker
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)docker)

test-io: $(DENO_BIN) ## Run Testsuite: IO
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)io)

test-rest: $(DENO_BIN) ## Run Testsuite: REST
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)rest)

test-xmrig: $(DENO_BIN) ## Run Testsuite: xmrig
	$(call deno,test -A --unstable -c deno.json --import-map vendor/import_map.json $(TEST_DIR)xmrig)

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m make %-30s\033[0m %s\n", $$1, $$2}'
