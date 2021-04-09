FROM node:12-stretch

RUN apt-get update && apt-get install -y jq curl gettext-base

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . ./

EXPOSE 3000