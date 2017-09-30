FROM tomcat:8.5-jre8-alpine

ENV FCREPO_VERSION 4.7.1
ENV FCREPO_WEBAPP fcrepo-${FCREPO_VERSION}/fcrepo-webapp-${FCREPO_VERSION}.war

WORKDIR /etc/spring
COPY spring/* /etc/spring/

# Fcrepo webapp
RUN  apk add --update curl \
 && rm -rf /var/cache/apk/* \
 && curl -L \
 https://github.com/fcrepo4/fcrepo4/releases/download/${FCREPO_WEBAPP} \
    > ${CATALINA_HOME}/webapps/fcrepo.war \
 && echo "fcrepo.modeshape.configuration=classpath:/config/file-simple/repository.json" \
    >> ${CATALINA_HOME}/conf/catalina.properties \
 && echo "org.apache.catalina.webresources.Cache.level = SEVERE" \
    >> ${CATALINA_HOME}/conf/logging.properties



