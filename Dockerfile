FROM node:alpine as dev

EXPOSE 4000

WORKDIR /app

ENV DB_URL=mongodb://mongo/development \
    HOST=0.0.0.0 \
    PORT=4000 \
    ENABLE_AUTH=false

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]

FROM dev as builder
CMD ["yarn", "build"]

FROM node:alpine
EXPOSE 4000
WORKDIR /app
ENV DB_URL=mongodb://mongo/resivip \
    HOST=0.0.0.0 \
    PORT=4000 \
    ENABLE_AUTH=true \
    NODE_ENV=production
COPY --from=builder /app .
RUN yarn install --production \
  && yarn cache clean
CMD ["node", "/app/lib"]
