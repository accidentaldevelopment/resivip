import 'reflect-metadata';
import config from './config';
import signale from 'signale';
import mongoose from 'mongoose';

async function main() {
  signale.await('connecting to %s', config.dbUrl);
  const db = await mongoose.connect(config.dbUrl, {useNewUrlParser: true});
  signale.success('connected to %s', config.dbUrl);

  await db.disconnect();
}

main()
  .then(() => {
    signale.complete('done running.');
  })
  .catch((e) => {
    signale.error(e);
  });
