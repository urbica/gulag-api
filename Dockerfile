#FROM node:9-alpine
#MAINTAINER Andrey Bakhvalov <bakhvalov.andrey@gmail.com>
#EXPOSE 3001
#
#WORKDIR /usr/app
#COPY package.json .
#RUN yarn
#COPY * ./
#
#CMD ["yarn", "start"]

FROM node:9-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
