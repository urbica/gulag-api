FROM node:8.11.1-alpine
LABEL maintainer='bakhvalov.andrey@gmail.com'

# Create app directory
WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --prod

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
