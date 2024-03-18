DENO_VERSION := 1.41.2
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

.PHONY: all run dev build test test-apps test-auth test-crypt test-docker test-io test-rest test-xmrig help fmt vendor
all: help

run: $(DENO_BIN) ## Run Server
	$(call deno,task launch-server)

dev: $(DENO_BIN) ## Run Dev Server
	$(call deno,task dev-server)

bundle: $(DENO_BIN) ## Bundle code
	$(call deno,bundle --unstable mod.ts bundle.js)

docker-build: ## Build Docker Image
    docker build -t lthn/server:latest .

build-sdk-typescript-angular: ## SDK Build: Angular
	bash docs/build-sdk.sh -p typescript-angular

build-sdk-typescript: ## SDK Build: TypeScript
	bash docs/build-sdk.sh -p typescript

build-sdk-python: ## SDK Build: TypeScript
	bash docs/build-sdk.sh -p python

test: $(DENO_BIN) ## Run full testsuite
	$(call deno,test -A --unstable --import-map vendor/import_map.json $(TEST_DIR))

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m make %-30s\033[0m %s\n", $$1, $$2}'
