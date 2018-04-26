FROM node:8

COPY src /src
COPY package.json /

RUN npm i --production

ENV PORT 80
EXPOSE 80

# CMD node npm run build && npm run start
CMD node src/server
