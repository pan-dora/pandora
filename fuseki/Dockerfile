FROM tomcat:9-jre8-alpine

ENV FUSEKI_VERSION 3.4.0
ENV FUSEKI_BASE /shared/fuseki-data

ENV DEBUG_PORT 5009

# Copy server.xml
COPY conf/* conf/

EXPOSE 3030
EXPOSE ${DEBUG_PORT}

RUN export FUSEKI_DIST=${FUSEKI_VERSION}/jena-fuseki-war-${FUSEKI_VERSION}.war      && \
    wget -O ${CATALINA_HOME}/webapps/fuseki.war \
    http://central.maven.org/maven2/org/apache/jena/jena-fuseki-war/${FUSEKI_DIST} && \
    echo "fbdba15d500fb2978e6658470bd9b84a2f7bc9fb *${CATALINA_HOME}/webapps/fuseki.war" \
        | sha1sum -c -                                                             && \
    mkdir -p ${FUSEKI_BASE}/configuration && \
    mkdir -p ${FUSEKI_BASE}/service-index_data && \
    mkdir -p ${FUSEKI_BASE}/manifests_data

COPY log4j.properties ${FUSEKI_BASE}
COPY shiro.ini ${FUSEKI_BASE}
COPY service-index.ttl ${FUSEKI_BASE}/configuration
COPY manifests.ttl ${FUSEKI_BASE}/configuration
COPY config.ttl ${FUSEKI_BASE}
