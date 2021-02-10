FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm ci

ENV NODE_ENV=production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
