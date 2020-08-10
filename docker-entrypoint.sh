#!/bin/bash

set -e

chown -R listarr:listarr /app

exec gosu listarr "$@"