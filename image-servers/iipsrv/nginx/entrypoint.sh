#!/bin/bash

### Start nginx
service nginx start

### Start IIPsrv
/srv/iipsrv/fcgi-bin/iipsrv.fcgi --bind 127.0.0.1:9000

### Keep PID1 alive with tail
tail -f /dev/null

