#!/bin/bash

set -e


# store arguments in a special array 
args=("$@") 
# get number of elements 
ELEMENTS=${#args[@]} 
 
# echo each element in array  
# for loop 
for (( i=0;i<$ELEMENTS;i++)); do 
    echo ${args[${i}]} 
done

# allow the container to be started with `--user`
if [ "$1" = 'npm start' -a "$(id -u)" = '0' ]; then
	find . \! -user listarr -exec chown listarr '{}' +
	exec gosu listarr "$0" "$@"
fi

exec "$@"