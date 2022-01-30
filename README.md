# Lethean Server

https://hub.docker.com/r/lthn/server

## Multi-arch image

- linux/amd64
- linux/arm64
- linux/ppc64le
- linux/s390x

`docker pull lthn/server:latest`

## Config File DB

We maintain a configuration file repository that is processed via a templating engine so create dynamic configuration file; feel free to add ANY OS configurations

https://github.com/letheanVPN/config-templates

--- move below to documentation / remove not relavant parts ---

Welcome to the magic part of the Lethean App, a client side restful TLS API, written in TypeScript and Rust.

This suite of features enables PWA's to become first class citizen's within the installed operating system.

To fire up a development server run the below and visit: https://localhost:36911

```shell
npm install
# Replace 'lthn' with 'npm run dev' for examples below
npm run dev backend start
```

The whole process will get better over time, for now.

To navigate the HTML help documentation visit https://localhost:36911 and convert the commands to the path 

For example, the chain start command: 

`daemon chain start`

becomes: https://localhost:36911/daemon/chain/start

The arguments documented can be sent as a POST request with a json body.

Conversion rule: `--confirm-external-bind` 

Becomes: `{"confirmExternalBind": true}`

You will get confirmation that the process has been created instantly.

To gather the stdOut from the process please subscribe to the executables WebSocket channel.

Currently, you can read and write files, download the cli, interact with all Lethean daemons via CMD or REST

## IPC

A ZeroMQ websocket is loaded to:  ws://localhost:36910 to start a development service run

The following endpoints can be used

- ws://localhost:36910/rep
- ws://localhost:36910/pub
- ws://localhost:36910/push

- `ZeroMQServer.sendPubMessage(channel: string, message: string)`
- `ZeroMQServer.sendRepMessage(channel: string, message: string)`
- `ZeroMQServer.sendPushMessage(channel: string, message: string)`

```shell
npm run dev backend ipc
```

## ProcessManager IO

You can access the input/output from ws://localhost:36909

### Commands (in dev mode)

- `lthn update cli`
- `lthn daemon chain start`
- `lthn daemon chain import`
- `lthn daemon chain export`
- `lthn daemon wallet cli`
- `lthn daemon wallet rpc`
- `lthn daemon wallet vpn`
- `lthn filesystem read --path=~/Lethean/(path is relative from here)`
- `lthn filesystem write --path=~/Lethean/(path is relative from here)`
- `lthn filesystem list --path=~/Lethean/(path is relative from here)`
- `lthn filesystem path --convert=(OS Aware path is returned)`

### Install VPN

Executables

- lthnvpnc
- lthnvpnd
- lvmgmt
```shell
cd refrence/lthn-vpn
pip install .
```

Uninstall:  `pip uninstall lethean-vpn`

### One line installer
* Mac/Linux

```shell
curl -fsSL https://raw.githubusercontent.com/letheanVPN/lthn/main/install.sh | sh
```

* Windows Powershell

```shell
iwr https://raw.githubusercontent.com/letheanVPN/lthn/main/install.ps1 -useb | iex
```

The CLI install will give you the $PATH variable to add

- `lthn --help` or for windows `lthn.exe --help`
