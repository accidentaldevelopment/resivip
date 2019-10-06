import { before, after } from 'mocha';
import { Mongoose, connect } from 'mongoose';
import config from '../src/config';

let db: Mongoose;

before(async function connectToDb() {
  db = await connect(config.dbUrl, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
});

after(async function disconnectFromDb() {
  await db.disconnect();
});
