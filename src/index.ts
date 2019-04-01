import 'reflect-metadata';
import config from './config';
import signale from 'signale';
import mongoose from 'mongoose';
import PartyModel from './models/Party';

async function main() {
  signale.await('connecting to %s', config.dbUrl);
  const db = await mongoose.connect(config.dbUrl, {useNewUrlParser: true});
  signale.success('connected to %s', config.dbUrl);

  signale.await('creating test party');
  const party = await PartyModel.create({
    maxSize: 4
  });
  signale.success('created test party');
  signale.debug(party);

  party.maxSize = 3;
  await party.save();
  signale.debug(party);

  await db.disconnect();
}

main()
  .then(() => {
    signale.complete('done running.');
  })
  .catch((e) => {
    signale.error(e);
  });
