FROM alpine:3.14.2

WORKDIR /app

COPY package.json .

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.14/main" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache python2 python3 make g++ yarn


RUN yarn install
COPY . .

EXPOSE 3002

CMD [ "yarn", "start" ]

