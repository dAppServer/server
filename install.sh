#!/bin/sh
# Copyright 2019-2021 the Deno authors & Lethean VPN. All rights reserved. MIT license.
# TODO(everyone): Keep this script simple and easily auditable.

set -e

if [ "$OS" = "Windows_NT" ]; then
	target="latest-windows-64/lthn.exe"
else
	case $(uname -sm) in
	"Darwin x86_64") target="latest-macos-intel/lthn" ;;
	"Darwin arm64") target="latest-macos-arm/lthn" ;;
	*) target="latest-linux-amd64/lthn" ;;
	esac
fi

	lthn_uri="https://github.com/letheanVPN/lthn/releases/download/${target}"


deno_install="${HOME}/Lethean"
bin_dir="$deno_install"
exe="$bin_dir/lthn"

if [ ! -d "$bin_dir" ]; then
	mkdir -p "$bin_dir"
fi

curl --fail --location --progress-bar --output "$exe" "$lthn_uri"
chmod +x "$exe"

echo "Lethean CLI was installed successfully to $exe"
if command -v lthn >/dev/null; then
	echo "Run 'lthn --help' to get started"
else
	case $SHELL in
	/bin/zsh) shell_profile=".zshrc" ;;
	*) shell_profile=".bash_profile" ;;
	esac
	echo "Manually add the directory to your \$HOME/$shell_profile (or similar)"
	echo "  export LETHEAN_CLI=\"$deno_install:$deno_install/cli\""
	echo "  export PATH=\"\$LETHEAN_CLI:\$PATH\""
	echo "Run '$exe --help' to get started"
fi

