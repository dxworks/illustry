FROM node:14-alpine as node
WORKDIR /app
EXPOSE 80

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist/client /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/conf.d/default.conf