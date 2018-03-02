FROM node:9-alpine
MAINTAINER Andrey Bakhvalov <bakhvalov.andrey@gmail.com>
EXPOSE 3001

WORKDIR /usr/app
COPY package.json .
RUN yarn
COPY * ./

CMD ["yarn", "start"]
