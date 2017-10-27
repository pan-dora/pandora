FROM ubuntu:16.04

MAINTAINER Christopher Johnson <christopher_hanna.johnson@uni-leipzig.de>
LABEL description = "Provides a Trellis Repository"

ENV TRELLIS_VERSION v0.1.0-RC1
ENV TRELLIS_SNAPSHOT trellis-app-0.1.0-SNAPSHOT
ENV TRELLIS_RUNTIME /opt
ENV JAVA_OPTS="-Xms250m -Xmx1024m"
RUN apt-get update && \
    apt-get -y install \
    default-jdk \
    git \
    bash \
    nano \
    curl \
    net-tools

RUN export TRELLIS_DIST=${TRELLIS_SNAPSHOT}.tar && \
    curl -SL "https://github.com/trellis-ldp/trellis-app/releases/download/${TRELLIS_VERSION}/${TRELLIS_DIST}"    \
        > /tmp/${TRELLIS_DIST} && \
    mkdir -p ${TRELLIS_RUNTIME}  && \
    cd ${TRELLIS_RUNTIME} && \
    tar -xvf /tmp/${TRELLIS_DIST} && \
    mv ${TRELLIS_SNAPSHOT} trellis && \
    rm -rf /tmp/${TRELLIS_DIST}*

WORKDIR ${TRELLIS_RUNTIME}/trellis
COPY trellis-app/etc etc
RUN mkdir /var/lib/trellis
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "/opt/trellis/etc/config.yml" ]