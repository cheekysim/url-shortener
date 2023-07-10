FROM node:20-alpine

WORKDIR /root/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run client-install

CMD [ "npm", "run", "prod" ]