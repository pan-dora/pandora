FROM node:alpine

RUN mkdir -p /integration

WORKDIR /integration

COPY .babelrc /integration/

COPY package.json /integration/

RUN npm install

COPY index.js /integration/

CMD [ "npm", "test" ]