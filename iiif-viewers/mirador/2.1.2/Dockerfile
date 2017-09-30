FROM node:boron

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Mirador Viewer Web Application"

ENV ANNOTATION_SERVER_HOST localhost:8100

WORKDIR /srv/mirador-ld

# Download and Install mirador-ld (master)
RUN git clone https://github.com/pan-dora/mirador-ld.git ./

##Install Grunt
RUN npm install grunt && npm install -g grunt-cli && npm install -g bower

##Install
RUN npm install

##Bower
RUN bower install --allow-root

##Grunt
RUN grunt

# Copy index.html configuration into the image
COPY cfg/* /srv/mirador-ld/

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 8000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "connect" ]