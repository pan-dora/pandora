#!/bin/bash
# set annotation server URI
sed -e "s:localhost\:8100:${ANNOTATION_SERVER_HOST}:" -i index.html

# Execute `npm` with any arguments suppled by CMD
exec grunt "$@"