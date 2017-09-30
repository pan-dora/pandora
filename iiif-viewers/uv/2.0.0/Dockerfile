FROM node:boron

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Universal Viewer Web Application"

WORKDIR /srv/uv

# Download and Install uv-webapp (master)
RUN git clone https://github.com/pan-dora/uv-webapp.git ./

##Install Grunt
RUN npm install grunt && npm install -g grunt-cli


##Install
RUN npm install

# Copy default.json configuration into the image
#COPY cfg/* config/

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 9001

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "connect" ]