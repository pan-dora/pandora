#!/bin/sh

/usr/local/bin/nghttpx -f0.0.0.0,8443 -bfuseki,3030 /etc/nghttp2/ca.key /etc/nghttp2/ca.crt

### Keep PID1 alive with tail
tail -f /dev/null

