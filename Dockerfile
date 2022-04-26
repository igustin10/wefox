FROM node:16.14.2-alpine3.14

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

CMD ["npm", "start"]