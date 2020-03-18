import { Resolver, Query, Arg, Ctx, Mutation } from 'type-graphql';
import PartyModel, { Party } from '../../models/Party';
import { Inject } from 'typedi';
import Context from '../../context';
import { AuthenticationError } from 'apollo-server';
import NewPartyInput from '../inputs/NewPartyInput';
import RsvpInput from '../inputs/RsvpInput';
import { Response } from '../../models/Response';

@Resolver(Party)
export class PartyResolver {
  constructor(
    @Inject('partyModel') private readonly partyModel: typeof PartyModel
  ) {}

  @Query(_returns => [Party], { description: 'Get a list of all parties.' })
  async parties(@Ctx() ctx: Context) {
    if (ctx.isLoggedIn) {
      return await this.partyModel.find();
    }
    throw new AuthenticationError('must be authenticated');
  }

  @Query(_returns => Party, {
    nullable: true,
    description: "Find a party based on a guests's name."
  })
  async party(@Arg('guestName') guestName: string) {
    return await this.partyModel.findOne({ 'guests.name': guestName });
  }

  @Mutation(_returns => Party, {
    nullable: true,
    description: 'Add and save a new party.'
  })
  async addParty(@Ctx() ctx: Context, @Arg('party') newParty: NewPartyInput) {
    if (ctx.isLoggedIn) {
      return await this.partyModel.create(newParty);
    }
    throw new AuthenticationError('must be authenticated');
  }

  @Mutation(_returns => Party, {
    description: 'Submit an RSVP with guests and meal selections.'
  })
  async submitRsvp(@Arg('rsvp') rsvp: RsvpInput) {
    const party = await this.partyModel.findById(rsvp._id);
    if (party) {
      party.isAttending = rsvp.isAttending;
      party.guests = rsvp.guests;
      return await party.save();
    }
    throw new Error(`party not found: ${rsvp._id}`);
  }

  @Mutation(_returns => Party, {
    description: 'Submit an RSVP for guest not attending.'
  })
  async submitNegativeRsvp(@Arg('id') id: string) {
    const party = await this.partyModel.findById(id);
    if (party) {
      party.isAttending = Response.NOT_ATTENDING;
      return await party.save();
    }
    throw new Error(`party not found: ${id}`);
  }
}
