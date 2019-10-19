import PartyModel, { Party } from '../../src/models/Party';
import { DocumentType } from '@typegoose/typegoose';
import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';

describe('PartyModel', () => {
  let party: DocumentType<Party>;

  beforeEach('setup', async () => {
    await PartyModel.deleteMany({});
    party = new PartyModel();
  });

  describe('#maxSize', () => {
    it('is required', (done) => {
      party.validate((err) => {
        expect(err.errors.maxSize.kind).to.equal('required');
        done();
      });
    });

    it('must be greater than 0', (done) => {
      party.maxSize = 0;
      party.validate((err) => {
        expect(err.errors.maxSize.kind).to.equal('min');
        done();
      });
    });
  });
});
