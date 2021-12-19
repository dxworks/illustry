
FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./usr/src/app
RUN npm ci
COPY tsconfig*.json ./usr/src/app
COPY . .
EXPOSE 3000
CMD [ "npm","run","dev" ]

# FROM node:14-alpine
# ENV NODE_ENV=production
# RUN apk add --no-cache tini
# WORKDIR /usr/src/app
# RUN chown node:node .
# USER node
# COPY package*.json ./
# RUN npm install
# COPY --from=builder /usr/src/app/dist/ dist/
# EXPOSE 3000
# # ENTRYPOINT [ "ls", "dist" ]
# ENTRYPOINT [ "node", "dist/index.js" ]
