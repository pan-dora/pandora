FROM ubuntu:16.04

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Provides an iip image server"

ENV SERIALIZATION_DIR=/mnt/serialization \
    BINARY_DIR=/binaries \
    FCREPO_CONTEXT_PATH=/fcrepo \
    REST_PATH=/rest

ENV IMAGE_ROOT=${SERIALIZATION_DIR}${BINARY_DIR}${FCREPO_CONTEXT_PATH}${REST_PATH}

RUN apt-get update -y && apt-get install -y build-essential wget cmake make git apache2 \
libapache2-mod-fcgid openssl libssl-dev autoconf libfcgi0ldbl libtool libjpeg-turbo8 \
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
RUN mkdir -p /srv/iipsrv/fcgi-bin
RUN cp src/iipsrv.fcgi /srv/iipsrv/fcgi-bin

### copy over apache2.conf for apache
COPY cfg/iipsrv.conf /etc/apache2/sites-available/iipsrv.conf

### make image directory
RUN mkdir -p ${SERIALIZATION_DIR}${BINARY_DIR}${FCREPO_CONTEXT_PATH}${REST_PATH}

### enable fcgid mod
RUN a2enmod fcgid  && a2enmod headers && a2enmod rewrite

WORKDIR ${SERIALIZATION_DIR}

### enable /srv root in apache.conf
RUN sed -e "s:^#<Directory /srv/>:<Directory /srv/>:" \
-i /etc/apache2/apache2.conf && \
sed -e "s:^#[ \t]Options Indexes FollowSymLinks:\tOptions Indexes FollowSymLinks:" \
-i /etc/apache2/apache2.conf && \
sed -e "s:^#[ \t]AllowOverride None:\tAllowOverride None:" \
-i /etc/apache2/apache2.conf && \
sed -e "s:^#[ \t]Require all granted:\tRequire all granted:" \
-i /etc/apache2/apache2.conf && \
sed -e "s:^#</Directory>:</Directory>:" \
-i /etc/apache2/apache2.conf

# disable default site conf
RUN a2dissite 000-default.conf && a2ensite iipsrv.conf

EXPOSE 80

CMD service apache2 start && tail -f /dev/null