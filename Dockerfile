FROM node:15-alpine

WORKDIR /app

ADD . /app

RUN npm i --dev

RUN npm run build

RUN rm -rf src

RUN rm tsconfig.json

RUN npm ci --production

ENTRYPOINT npm start