DENO_VERSION := 1.20.1
DENO_INSTALL := third_party
include deno.mk

.PHONY: all build
all: $(DENO_BIN)
	$(call deno,run --allow-net --allow-env --allow-run --allow-read --allow-write --unstable mod.ts backend start)

build: $(DENO_BIN)
	$(call deno,compile --allow-net --allow-env --allow-run --allow-read --allow-write --unstable mod.ts)
