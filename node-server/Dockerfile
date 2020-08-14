FROM node:10

RUN mkdir -p ./app/docker/app

WORKDIR ./app/docker/app

COPY ./app/package.json /app/docker/app

RUN npm install

COPY ./app /app/docker/app
COPY wait-for-it.sh /


ENV PORT 4000
EXPOSE 4000

# RUN npm run build

CMD npm run docker
