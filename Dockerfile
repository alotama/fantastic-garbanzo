FROM node:12-stretch

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node ./pages ./public ./styles ./

EXPOSE 3000

CMD ["npm", "run", "dev"]