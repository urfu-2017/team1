FROM node:8

COPY server /server
COPY pages /pages
COPY package.json /

RUN npm i --production

ENV PORT 80
EXPOSE 80

CMD node server/index.js