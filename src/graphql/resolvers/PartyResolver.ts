import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql';
import PartyModel, { Party } from '../../models/Party';
import NewPartyInput from '../inputs/NewPartyInput';
import { Inject } from 'typedi';

@Resolver(Party)
export class PartyResolver {
  constructor(@Inject('partyModel') private readonly partyModel: typeof PartyModel) {}

  @Query((returns) => [Party])
  async parties() {
    return await this.partyModel.find();
  }

  @Mutation((returns) => Party)
  async addParty(@Arg('data') addParty: NewPartyInput) {
    return await this.partyModel.create({
      maxSize: addParty.maxSize,
      guests: addParty.guests
    });
  }
}
