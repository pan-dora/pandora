FROM ubuntu:16.04

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Loris Image Server"

ENV HOME /root
ENV CONFIG_FILE_PATH /opt/loris/etc/loris2.conf

# Update packages and install tools
RUN apt-get update -y && apt-get install -y wget git unzip

# Install pip and python libs
RUN apt-get install -y python-dev python-setuptools python-pip
RUN pip install --upgrade pip
RUN pip2.7 install Werkzeug
RUN pip2.7 install configobj

RUN ln -s /usr/lib/`uname -i`-linux-gnu/libfreetype.so /usr/lib/ \
	&& ln -s /usr/lib/`uname -i`-linux-gnu/libjpeg.so /usr/lib/ \
	&& ln -s /usr/lib/`uname -i`-linux-gnu/libz.so /usr/lib/ \
	&& ln -s /usr/lib/`uname -i`-linux-gnu/liblcms.so /usr/lib/ \
	&& ln -s /usr/lib/`uname -i`-linux-gnu/libtiff.so /usr/lib/ \

RUN echo "/usr/local/lib" >> /etc/ld.so.conf && ldconfig

# Install Pillow
RUN apt-get install -y libjpeg8 libjpeg8-dev libfreetype6 libfreetype6-dev zlib1g-dev liblcms2-2 liblcms2-dev \
liblcms2-utils libtiff5-dev git libopenjp2-7
RUN pip2.7 install Pillow

# Install loris
WORKDIR /opt

RUN git clone https://github.com/pan-dora/loris.git

RUN useradd -d /var/www/loris -s /sbin/false loris

WORKDIR /opt/loris

# Install openjpeg
RUN cp lib/Linux/x86_64/libopenjp2.so.2.1.2 /usr/local/lib && chmod 755 /usr/local/lib/libopenjp2.so.2.1.2
RUN cp bin/Linux/x86_64/opj_decompress /usr/local/bin	&& chmod 755 /usr/local/bin/opj_decompress

RUN ./setup.py install
COPY loris2.conf etc/loris2.conf

WORKDIR /opt/loris/loris

# bind test server to 0.0.0.0
RUN sed -i -- 's/localhost/0.0.0.0/g' webapp.py
#RUN sed -i 's|app = create_app(debug=True)|app = create_app(debug=False, config_file_path='\'${CONFIG_FILE_PATH}\'')|g' webapp.py

EXPOSE 5004
CMD ["python", "webapp.py"]