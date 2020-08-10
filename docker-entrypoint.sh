#!/bin/bash
set -e

if [ "$1" = 'npm' ]; then

    chown -R -c listarr:listarr /app/server/config

    echo "Finished Fixing Permissions"

    exec gosu listarr "$@"

fi

exec "$@"