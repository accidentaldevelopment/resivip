FROM node:alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn tsc

FROM node:alpine
EXPOSE 4000
WORKDIR /app
ENV DB_URL=mongodb://mongo/resivip \
    HOST=0.0.0.0 \
    PORT=4000 \
    ENABLE_AUTH=true \
    NODE_ENV=production
COPY --from=builder /app/package.json .
RUN yarn install --production \
  && yarn cache clean
COPY --from=builder /app/lib/ lib/
CMD ["node", "/app/lib"]
