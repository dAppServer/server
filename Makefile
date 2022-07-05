DENO_VERSION := 1.23.2
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

.PHONY: all run build test test-apps test-auth test-crypt test-docker test-io test-rest test-xmrig help fmt
all: help

run: $(DENO_BIN) ## Run Server
	$(call deno,run -A -c deno.json --watch --unstable mod.ts)

fmt: $(DENO_BIN) ## Format code
	$(call deno,fmt -c deno.json)

build: $(DENO_BIN) ## Build binary for the host machine
	$(call deno,compile -A --output build/lthn -c deno.json --unstable mod.ts)

build-linux: $(DENO_BIN) ## Build binary for Linux
	$(call deno,compile -A --output build/lthn -c deno.json --unstable --target x86_64-unknown-linux-gnu mod.ts)

build-windows: $(DENO_BIN)  ## Build binary for Windows x86_64
	$(call deno,compile -A --output build/lthn -c deno.json --unstable --target x86_64-pc-windows-msvc mod.ts)

build-macos: $(DENO_BIN)  ## Build binary for macOS Intel
	$(call deno,compile -A --output build/lthn -c deno.json --unstable --target x86_64-apple-darwin mod.ts)

build-macos-arm: $(DENO_BIN)  ## Build binary for macOS Arm
	$(call deno,compile -A --output build/lthn -c deno.json --unstable --target aarch64-apple-darwin mod.ts)



test: $(DENO_BIN) ## Run full testsuite
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR))

test-apps: $(DENO_BIN) ## Run Testsuite: apps
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)apps)

test-auth: $(DENO_BIN) ## Run Testsuite: Auth
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)auth)

test-crypt: $(DENO_BIN) ## Run Testsuite: Crypt
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)crypt)

test-docker: $(DENO_BIN) ## Run Testsuite: Docker
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)docker)

test-io: $(DENO_BIN) ## Run Testsuite: IO
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)io)

test-rest: $(DENO_BIN) ## Run Testsuite: REST
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)rest)

test-xmrig: $(DENO_BIN) ## Run Testsuite: xmrig
	$(call deno,test -A --unstable -c deno.json $(TEST_DIR)xmrig)

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m make %-30s\033[0m %s\n", $$1, $$2}'
