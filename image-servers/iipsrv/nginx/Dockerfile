FROM ubuntu:16.04

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides an iip image server"

ENV SERIALIZATION_DIR=/mnt/serialization \
    BINARY_DIR=/binaries \
    FCREPO_CONTEXT_PATH=/fcrepo \
    REST_PATH=/rest \
    IIPSRV_PORT=80 \
    IIPSRV_BASEDIR=/srv/iipsrv \
    VERBOSITY="10" \
    LOGFILE=/tmp/iipsrv.log \
    MAX_IMAGE_CACHE_SIZE="10" \
    JPEG_QUALITY="50"\
    MAX_CVT="3000" \
    FILESYSTEM_PREFIX=/mnt/serialization/binaries/fcrepo/rest/

ENV IMAGE_ROOT=${SERIALIZATION_DIR}${BINARY_DIR}${FCREPO_CONTEXT_PATH}${REST_PATH}

RUN apt-get update -y && apt-get install -y build-essential wget cmake make git apache2 \
nginx openssl libssl-dev autoconf libfcgi0ldbl libtool libjpeg-turbo8 \
libjpeg-turbo8-dev libtiff5-dev libpng12-0 libpng12-dev libmemcached-dev \
memcached liblcms2-2 liblcms2-dev libgomp1 libpthread-stubs0-dev liblzma5 \
liblzma-dev libjbig-dev libjbig0 libz80ex1 libz80ex-dev pkg-config zlib1g-dev libopenjp2-7 bash net-tools

### Download and compile openjpeg2.1.2 (master)
WORKDIR /tmp/openjpeg
RUN git clone https://github.com/uclouvain/openjpeg.git ./
RUN cmake . && make && make install

### download and compile Ruven's iipsrv (master)
WORKDIR /tmp/iip
RUN git clone https://github.com/ruven/iipsrv ./
RUN chmod +x autogen.sh && sleep 2 && ./autogen.sh
RUN chmod +x configure && sleep 2 && ./configure --with-openjpeg=/tmp/openjpeg && sleep 2 && make && make install

### make www dir and copy iip binary into fcgi bin
RUN mkdir -p ${IIPSRV_BASEDIR}/fcgi-bin
RUN cp src/iipsrv.fcgi ${IIPSRV_BASEDIR}/fcgi-bin

### copy over ngix conf
COPY cfg/iipsrv /etc/nginx/sites-available/iipsrv
RUN ln -s /etc/nginx/sites-available/iipsrv /etc/nginx/sites-enabled/iipsrv && rm /etc/nginx/sites-enabled/default

### make image directory
RUN mkdir -p ${SERIALIZATION_DIR}${BINARY_DIR}${FCREPO_CONTEXT_PATH}${REST_PATH}

WORKDIR ${SERIALIZATION_DIR}

COPY entrypoint.sh /entrypoint.sh

RUN chmod 700 /entrypoint.sh

EXPOSE ${IIPSRV_PORT}

ENTRYPOINT [ "/entrypoint.sh" ]