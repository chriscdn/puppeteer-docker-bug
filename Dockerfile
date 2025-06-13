FROM ghcr.io/puppeteer/puppeteer:latest AS base

WORKDIR /app/

COPY package.json yarn.lock ./
RUN yarn install

COPY src/ src/

CMD ["yarn", "test"]