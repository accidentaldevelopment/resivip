import PartyModel, { Party } from '../../src/models/Party';
import { InstanceType } from 'typegoose';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Guest } from '../../src/models/Guest';
import { invalidGuestLengthError, duplicateGuestError } from '../../src/models/validators/errors';

describe('GuestModel', () => {
  let party: InstanceType<Party>;

  beforeEach('setup', async () => {
    await PartyModel.deleteMany({});
    party = new PartyModel();
  });

  describe('#guests', () => {
    it('must be fewer than maxSize', (done) => {
      party.maxSize = 1;
      party.guests.push({name: 'g1'} as Guest);
      party.guests.push({name: 'g2'} as Guest);
      party.validate((err) => {
        expect(err.errors.guests.kind).to.equal(invalidGuestLengthError.kind);
        expect(err.errors.guests.message).to.equal(invalidGuestLengthError.message(party.maxSize));
        done();
      });
    });

    it('must be unique across documents', (done) => {
      PartyModel.create({ maxSize: 1, guests: [ {name: 'Aram'} ] }, () => {
        const p = new PartyModel({
          maxSize: 1,
          guests: [ {name: 'Aram'} ]
        });
        p.save((err) => {
          expect(err.errmsg).to.match(/duplicate key error collection: development\.parties index: guests\.name/);
          done();
        });
      });
    });

    it('must be unique within document', (done) => {
      party.maxSize = 2;
      party.guests = [
        {name: 'Aram'},
        {name: 'Aram'}
      ];
      party.validate((err) => {
        expect(err.errors.guests.kind).to.equal(duplicateGuestError.kind);
        expect(err.errors.guests.message).to.equal(duplicateGuestError.message([{name: 'Aram'}]));
        done();
      });
    });
  });
});
