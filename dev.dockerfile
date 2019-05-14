FROM node:alpine

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
