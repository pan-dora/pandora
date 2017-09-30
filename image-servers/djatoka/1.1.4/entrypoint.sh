#!/bin/bash

### Start with Maven
mvn jetty:run-forked 2>&1

### Run cron on container startup
cron -L 15

### Keep PID1 alive with tail
tail -f /dev/null

