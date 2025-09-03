FROM node:12.22.4-alpine3.14

RUN apk add --update --no-cache g++ gcc libgcc libstdc++ linux-headers make python3

ENV APP_HOME=/usr/src/app/
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY package.json yarn.lock $APP_HOME

RUN yarn install

COPY . $APP_HOME

EXPOSE 3001

CMD [ "yarn", "dev" ]
