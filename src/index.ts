import 'reflect-metadata';
import config from './config';
import signale from 'signale';
import mongoose, { Mongoose } from 'mongoose';
import PartyModel from './models/Party';
import { ApolloServer, gql } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PartyResolver } from './graphql/resolvers/PartyResolver';
import { Container } from 'typedi';

const typeDefs = gql`
type Query {
  parties: [Party!]!
}
type Party {
  maxSize: Int!
  guests: [Guest!]!
}
type Guest {
  name: String!
}
`;

let db: Mongoose;
let server: ApolloServer;

async function main() {
  signale.await('connecting to %s', config.dbUrl);
  db = await mongoose.connect(config.dbUrl, {useNewUrlParser: true, useCreateIndex: true});
  signale.success('connected to %s', config.dbUrl);

  Container.set('partyModel', PartyModel);

  const schema = await buildSchema({
    resolvers: [PartyResolver],
    container: Container
  });

  server = new ApolloServer({
    schema
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
