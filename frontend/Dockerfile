FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Этап запуска через nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]