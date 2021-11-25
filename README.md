# Lethean Unified Command Line & Rest API

Welcome to the magic part of the Lethean App, a client side restful TLS API, written in TypeScript and Rust.

This suite of features enables PWA's to become first class citizen's within the installed operating system.

To fire up a development server run the below and visit: https://localhost:36911

```shell
npm install
npm run dev backend start
```

The whole process will get better over time, for now.

To navigate the HTML help documentation visit https://localhost:36911 and convert the commands to the path 

For example, the chain start command: 

`npm run dev daemon chain start`

becomes: https://localhost:36911/daemon/chain/start

The arguments documented can be sent as a POST request with a json body.

Conversion rule: `--confirm-external-bind` 

Becomes: `{"confirmExternalBind": true}`

You will get confirmation that the process has been created instantly.

To gather the stdOut from the process please subscribe to the executables WebSocket channel.

Currently you can read and write files, download the cli, interact with all Lethean daemons via CMD or REST

### One line installer
* Mac/Linux

```shell
curl -fsSL https://gitlab.com/lthn/projects/vpn/dvpn/-/raw/main/install.sh | sh
```

* Windows Powershell

```shell
iwr https://gitlab.com/lthn/projects/vpn/dvpn/-/raw/main/install.ps1 -useb | iex
```

The CLI install will give you the $PATH variable to add

- `lthn --help` or for windows `lthn.exe --help`
