FROM node:8

COPY server /server
COPY client /client
COPY public /public
COPY package.json /
COPY env.production /.env

RUN npm i --production

ENV PORT 80
EXPOSE 80

CMD node server/index.js
