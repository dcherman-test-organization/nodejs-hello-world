FROM node:10-alpine

RUN apk add --no-cache tini

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

EXPOSE 8000 9000
ENTRYPOINT ["tini", "--"]
CMD ["yarn", "start"]
