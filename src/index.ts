import 'reflect-metadata';
import config from './config';
import signale from 'signale';
import mongoose, { Mongoose } from 'mongoose';
import PartyModel from './models/Party';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PartyResolver } from './graphql/resolvers/PartyResolver';
import { Container } from 'typedi';
import Context from './context';
import { PingResolver } from './graphql/resolvers/PingResolver';

let db: Mongoose;
let server: ApolloServer;

interface AppContext {
  token: string;
}

async function main() {
  signale.await('connecting to %s', config.dbUrl);
  db = await mongoose.connect(config.dbUrl, {useNewUrlParser: true, useCreateIndex: true});
  signale.success('connected to %s', config.dbUrl);

  Container.set('partyModel', PartyModel);

  const schema = await buildSchema({
    resolvers: [PingResolver, PartyResolver],
    container: Container
  });

  server = new ApolloServer({
    schema,
    cors: process.env.NODE_ENV !== 'production',
    context: ({req}): Context => {
      if (!config.authenticationEnabled) {
        return {isLoggedIn: true};
      }

      // tslint:disable-next-line: max-line-length
      if (req.header('X-Token') === '1xsjTkay6eGAdwCS+fI/Ypv/MqJlY2C3+IXm0/UPeevhfatOwp1poSbGBz0HZkAhHJbYqegctiICfZx9e8EL') {
        return {isLoggedIn: true};
      }
      return {isLoggedIn: false};
    }
  });

  const info = await server.listen(config.port, config.host);

  signale.info('listening on %s:%d', info.address, info.port);
}

main()
  .then(() => {
    signale.complete('startup complete');
  })
  .catch(async (e) => {
    signale.error(e);
    if (db) { await db.disconnect(); }
  });
