
FROM node:16-alpine as client
WORKDIR /usr
COPY client /usr/client
WORKDIR /usr/client
RUN npm install
RUN npm run build-prod



FROM node:16-alpine as server
RUN npm install -g npm@latest
COPY server /usr/server
COPY --from=client /usr/client/dist/client /usr/server/src/static
WORKDIR /usr/server
RUN npm ci
RUN npm run build


FROM node:16-alpine
ENV NODE_ENV production
COPY --from=server /usr/server /usr/illustry
RUN rm -rf /usr/illustry/src
WORKDIR /usr/illustry

CMD ["node", "dist/app.js"]

