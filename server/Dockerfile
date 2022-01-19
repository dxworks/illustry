FROM node:16-alpine
ENV NODE_ENV production

WORKDIR /usr/illustry

COPY package*.json ./

RUN npm ci --only=production

COPY dist ./

COPY ../README.md .
COPY ../LICENSE .

LABEL name="Illustry"
LABEL description="A hub for visualizing data about software systems"
LABEL stable="false"

CMD ["node", "dist/app.js"]
