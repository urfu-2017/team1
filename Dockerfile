FROM node:8

COPY src /src
COPY package.json /

RUN npm i

ENV PORT 80
ENV NODE_ENV production
EXPOSE 80

CMD npm run build && npm run dev
