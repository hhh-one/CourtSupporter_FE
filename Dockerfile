FROM node

RUN mkdir /app
WORKDIR /app

RUN mkdir ./dist

ADD . .

RUN npm install yarn
RUN yarn install
RUN yarn add serve

ENTRYPOINT ["yarn", "serve", "-s", "dist"]
