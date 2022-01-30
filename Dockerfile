FROM debian:bullseye as base

RUN apt-get update && apt-get upgrade

RUN apt-get install -y make build-essential curl wget joe less haproxy openvpn squid net-tools stunnel pwgen

WORKDIR /home/Lethean


