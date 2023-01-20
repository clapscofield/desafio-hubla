FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

VOLUME ["/app/node_modules"]

CMD ["node", "server.js"]