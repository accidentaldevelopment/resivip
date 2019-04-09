import { Resolver, Query, Arg, Ctx, Mutation } from 'type-graphql';
import PartyModel, { Party } from '../../models/Party';
import { Inject } from 'typedi';
import Context from '../../context';
import { AuthenticationError } from 'apollo-server';
import NewPartyInput from '../inputs/NewPartyInput';

@Resolver(Party)
export class PartyResolver {
  constructor(@Inject('partyModel') private readonly partyModel: typeof PartyModel) {}

  @Query((returns) => [Party])
  async parties(@Ctx() ctx: Context) {
    if (ctx.isLoggedIn) {
      return await this.partyModel.find();
    }
    throw new AuthenticationError('must be authenticated');
  }

  @Query((returns) => Party, {nullable: true})
  async party(@Arg('guestName') guestName: string) {
    return await this.partyModel.findOne({'guests.name': guestName});
  }

  @Mutation((returns) => Party, {nullable: true})
  async addParty(@Ctx() ctx: Context, @Arg('party') newParty: NewPartyInput) {
    if (ctx.isLoggedIn) {
      return await this.partyModel.create(newParty);
    }
    throw new AuthenticationError('must be authenticated');
  }
}
