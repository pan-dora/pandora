FROM pandoraframework/karaf:4.0.8

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides a Karaf container configured with ActiveMQ"

ENV ACTIVEMQ_VERSION=LATEST \
    DEBUG_PORT=5005  \
    JOLOKIA_PORT=8181 \
    JMX_PORT=1099

RUN bin/start && \
    sleep 10 && \
    bin/client -r 10 -d 5  "feature:repo-add activemq ${ACTIVEMQ_VERSION}" && \
    bin/client -r 10 -d 5  "feature:install activemq-broker" && \
    bin/stop

ENV JAVA_DEBUG_PORT=${DEBUG_PORT}

# Copy Karaf feature configuration files into the image
COPY cfg/* etc/

# Update the Karaf logging configuration so that `bin/karaf` will echo logging
# to the console, viewable by `docker logs`

RUN sed -e "s/osgi:/stdout, osgi:/" -i etc/org.ops4j.pax.logging.cfg

COPY entrypoint.sh /entrypoint.sh

RUN chmod 700 /entrypoint.sh

EXPOSE ${JOLOKIA_PORT}
EXPOSE ${JMX_PORT}

ENTRYPOINT [ "/entrypoint.sh" ]

# Launch Karaf with no console, and debugging enabled by default.
CMD [ "server", "debug" ]
