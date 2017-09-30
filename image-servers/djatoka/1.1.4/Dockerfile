FROM ubuntu:16.04

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides a Djatoka Image Server"

ENV DJATOKA_PORT=8888 \
    JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 \
    MAVEN_HOME=/root/.m2 \
    SERIALIZATION_DIR=/mnt/serialization

ENV MAVEN_REPO=${MAVEN_HOME}/repository

# Make maven repository directory
RUN mkdir -p ${MAVEN_REPO}

# Copy local settings and base webapp data
COPY cfg/settings.xml /root/.m2

# Update repository contents and add base packages
RUN apt-get update && \
    apt-get -y install \
    default-jdk \
    maven \
    git \
    bash \
    curl \
    gettext \
    net-tools \
    cron

### Download Djatoka (dev)
WORKDIR /srv/djatoka
RUN git clone https://github.com/pan-dora/freelib-djatoka.git ./ && git checkout 1.1.4

### Install with Maven
RUN mvn install -s ${MAVEN_HOME}/settings.xml -DskipTests -Dcheckstyle.skip=true

### Setup cron for ingester
COPY cfg/crontab /etc/cron.d/ingester

### assign rights to the cron job
RUN chmod 0644 /etc/cron.d/ingester

###install crontab
RUN crontab /etc/cron.d/ingester

### Create the log file to be able to run tail
RUN touch /var/log/cron.log

COPY entrypoint.sh /entrypoint.sh

RUN chmod 700 /entrypoint.sh

EXPOSE ${DJATOKA_PORT}

ENTRYPOINT [ "/entrypoint.sh" ]
