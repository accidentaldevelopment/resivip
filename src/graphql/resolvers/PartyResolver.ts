import { Resolver, Query, Arg, Ctx } from 'type-graphql';
import PartyModel, { Party } from '../../models/Party';
import { Inject } from 'typedi';
import Context from '../../context';
import { AuthenticationError } from 'apollo-server';

@Resolver(Party)
export class PartyResolver {
  constructor(@Inject('partyModel') private readonly partyModel: typeof PartyModel) {}

  @Query((returns) => [Party])
  async parties(@Ctx() ctx: Context) {
    if (ctx.isLoggedIn)
      return await this.partyModel.find();
    throw new AuthenticationError('must be authenticated');
  }

  @Query((returns) => Party, {nullable: true})
  async party(@Arg('guestName') guestName: string) {
    return await this.partyModel.findOne({'guests.name': guestName});
  }
}
