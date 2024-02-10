FROM debian:bullseye-slim as builder

RUN apt-get update && apt-get install -y curl unzip git

RUN curl -fsSL https://deno.land/install.sh | bash

COPY . /app

WORKDIR /app

ENV DENO_INSTALL="/root/.deno"

ENV PATH="$DENO_INSTALL/bin:$PATH"

ENTRYPOINT [ "deno", "task", "dev-server" ]

FROM builder as runner

# This is equivalent to running npm install.
RUN deno cache --unstable ./mod.ts

# API tcp / ZeroMQ WebSocket / stdIn,stdOut,stdErr Websocket
EXPOSE 36911 36910 36909

CMD [ "deno", "task", "launch-server" ]