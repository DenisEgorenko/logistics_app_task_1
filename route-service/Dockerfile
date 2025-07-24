# route-service/Dockerfile
FROM node:20-alpine

WORKDIR /app

ARG PORT=3002
ENV PORT=$PORT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]