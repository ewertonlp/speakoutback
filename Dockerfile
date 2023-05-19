FROM node:lts-alpine3.17
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
ENV NODE_VERSION=16.17.1
RUN yarn install
COPY . .
ENV NODE_ENV=production
RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]
