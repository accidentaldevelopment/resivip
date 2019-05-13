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
      return {isLoggedIn: true};
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
