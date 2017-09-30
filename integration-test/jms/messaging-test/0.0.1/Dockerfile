FROM pandoraframework/karaf:4.0.8

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides a Karaf container configured with Camel Toolbox features"

# The version of TOOLBOX features being included in the image
ENV TOOLBOX_VERSION=LATEST \
    CAMEL_VERSION=LATEST \
    ACTIVEMQ_VERSION=LATEST \
    HAWTIO_VERSION=1.4.68 \
    FCREPO_HOST=localhost \
    ACTIVEMQ_HOST=activemq \
    FCREPO_PORT=8080 \
    FCREPO_CONTEXT_PATH=/fcrepo \
    FUSEKI_HOST=fuseki \
    FUSEKI_PORT=3030 \
    DEBUG_PORT=5005  \
    JOLOKIA_PORT=8181 \
    REINDEXING_PORT=9080 \
    SERIALIZATION_DIR=/mnt/serialization

### make directories
#RUN mkdir -p ${SERIALIZATION_DIR}/binaries/ ${SERIALIZATION_DIR}/descriptions/

RUN bin/start && \
    sleep 10 && \
    bin/client -r 10 -d 5  "feature:repo-add mvn:org.fcrepo.camel/toolbox-features/${TOOLBOX_VERSION}/xml/features" && \
    bin/client -r 10 -d 5  "feature:repo-add camel ${CAMEL_VERSION}" && \
    bin/client -r 10 -d 5  "feature:repo-add activemq ${ACTIVEMQ_VERSION}" && \
   ## bin/client -r 10 -d 5  "feature:repo-add hawtio ${HAWTIO_VERSION}" && \
    bin/client -r 10 -d 5  "feature:install fcrepo-service-activemq" && \
    bin/client -r 10 -d 5  "feature:install fcrepo-reindexing" && \
    bin/client -r 10 -d 5  "feature:install fcrepo-indexing-triplestore" && \
    bin/client -r 10 -d 5  "feature:install fcrepo-serialization" && \
    ##bin/client -r 10 -d 5  "feature:install hawtio" && \
    bin/stop


ENV JAVA_DEBUG_PORT=${DEBUG_PORT} \
    FUSEKI_BASEURI=http:/d/${FUSEKI_HOST}:${FUSEKI_PORT}/fuseki/manifests \
    FCREPO_BASEURI=http://${FCREPO_HOST}:${FCREPO_PORT}${FCREPO_CONTEXT_PATH}/rest

# Copy Karaf feature configuration files into the image
COPY cfg/* etc/

# Update the Karaf logging configuration so that `bin/karaf` will echo logging
# to the console, viewable by `docker logs`

RUN sed -e "s/osgi:/stdout, osgi:/" -i etc/org.ops4j.pax.logging.cfg

# Temporary for local development; copy any Maven artifacts into `maven/` that you want the image build process to see (e.g. locally build features that have yet to be published)
#ADD maven/ /build/repository/

COPY entrypoint.sh /entrypoint.sh

RUN chmod 700 /entrypoint.sh

EXPOSE ${REINDEXING_PORT}
EXPOSE ${JOLOKIA_PORT}
ENTRYPOINT [ "/entrypoint.sh" ]

# Launch Karaf with no console, and debugging enabled by default.
CMD [ "server", "debug" ]
