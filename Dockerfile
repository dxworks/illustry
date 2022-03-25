
FROM node:16-alpine as client
COPY client /usr/client
WORKDIR /usr/client
RUN npm install
RUN npm run build-prod

FROM python:3.9 as docs
COPY documentation /usr/documentation
WORKDIR /usr/documentation
RUN pip install mkdocs-material
RUN ["mkdocs", "build"]


FROM node:16-alpine as server
RUN npm install -g npm@latest
COPY server /usr/server
COPY --from=client /usr/client/dist/client /usr/server/src/static
COPY --from=docs /usr/documentation/site /usr/server/src/docs
WORKDIR /usr/server
RUN npm ci
RUN npm run build

FROM node:16-alpine
ENV NODE_ENV production
COPY --from=server /usr/server /usr/illustry
RUN rm -rf /usr/illustry/src
WORKDIR /usr/illustry

LABEL name="Illustry"
LABEL description="A hub for visualizing data about software systems"
LABEL stable="false"

CMD ["node", "dist/app.js"]

