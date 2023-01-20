FROM node:lts-alpine

WORKDIR /app

COPY . /app

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]