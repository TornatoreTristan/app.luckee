FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node ace build --production

EXPOSE 3333

CMD ["node", "build/server.js"]