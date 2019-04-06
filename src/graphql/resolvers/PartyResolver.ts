import { Resolver, Query, Mutation, Arg } from 'type-graphql';
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

  @Query((returns) => Party, {nullable: true})
  async party(@Arg('guestName') guestName: string) {
    return await this.partyModel.findOne({'guests.name': guestName});
  }

  @Query((returns) => Party, {nullable: true})
  async partyById(@Arg('id') id: string) {
    return await this.partyModel.findById(id);
  }

  @Mutation((returns) => Party)
  async addParty(@Arg('data') addParty: NewPartyInput) {
    return await this.partyModel.create({
      maxSize: addParty.maxSize,
      guests: addParty.guests
    });
  }
}
