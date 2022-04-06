# Lethean Server

This repository is a mess, but it's a mess I made working the problem, when I
write tests, it'll be sensible.

- Build Status:
  [![lethean-server](https://github.com/letheanVPN/lethean-server/actions/workflows/compile.yml/badge.svg)](https://github.com/letheanVPN/lethean-server/actions/workflows/compile.yml)
- Test Coverage:
  [![Coverage Status](https://coveralls.io/repos/github/letheanVPN/lethean-server/badge.svg?branch=main)](https://coveralls.io/github/letheanVPN/lethean-server?branch=main)

## Requirements

1. Deno https://deno.land
2. Lethean data directory `$HOME/Lethean`

## Development Server

```shell
deno run --reload --allow-all --unstable https://raw.githubusercontent.com/letheanVPN/lethean-server/main/mod.ts
```
https://hub.docker.com/r/lthn/server

`docker pull lthn/server:latest`
