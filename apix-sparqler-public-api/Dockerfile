FROM node:boron

MAINTAINER Christopher Johnson <christopher_hanna.johnson@uni-leipzig.de>
LABEL description = "APIX Sparqler Public API"

WORKDIR /srv/apix-sparqler-service

# Download and Install (master)
RUN git clone https://github.com/pan-dora/apix-sparqler-public-api.git ./
RUN npm install

# Copy default.json configuration into the image
COPY cfg/* config/

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "start" ]