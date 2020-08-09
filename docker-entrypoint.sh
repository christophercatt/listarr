#!/bin/bash

set -e

# allow the container to be started with `--user`
if [ "$1" = 'redis-server' -a "$(id -u)" = '0' ]; then
	find . \! -user listarr -exec chown listarr '{}' +
	exec gosu listarr "$0" "$@"
fi

exec "$@"