FROM node:15 as builder

RUN apt-get update -y && apt-get upgrade -y

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY app.js .

FROM node:15-alpine

COPY --from=builder /app/. .

ENTRYPOINT [ "node", "app.js" ]

EXPOSE 80