DENO_VERSION := 1.21.0
DENO_INSTALL := third_party
include deno.mk

.PHONY: all build
all: $(DENO_BIN)
	$(call deno,run -A --import-map vendor/import_map.json --unstable mod.ts)

build: $(DENO_BIN)
	$(call deno,compile -A --output build/lthn --import-map vendor/import_map.json --unstable mod.ts)
