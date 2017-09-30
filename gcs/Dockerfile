FROM ubuntu:16.04

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides a storage container for Google Cloud Storage"

ENV API_KEY=pandora-service.json

RUN apt-get update && \
    apt-get -y install \
    curl

RUN export GCSFUSE_REPO=gcsfuse-xenial && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list

RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

RUN apt-get update && \
    apt-get -y install \
    golang-go \
    gcsfuse \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual \
    apt-transport-https \
    ca-certificates \
    software-properties-common

RUN curl -fsSL https://yum.dockerproject.org/gpg | apt-key add -

RUN add-apt-repository "deb https://apt.dockerproject.org/repo/ ubuntu-$(lsb_release -cs) main"
RUN apt-get update && \
    apt-get -y install \
    docker-engine

### make Go Path
RUN mkdir -p /home/gcs/go

### Set go environment
ENV GOPATH /home/gcs/go

RUN go get github.com/craimbert/docker-volume-gc-storage && \
    go install github.com/craimbert/docker-volume-gc-storage

WORKDIR /home/gcs/go

COPY credentials/${API_KEY} /tmp

#initialize gcs service
#RUN bin/docker-volume-gc-storage -gcp-key-json /tmp/${API_KEY}

