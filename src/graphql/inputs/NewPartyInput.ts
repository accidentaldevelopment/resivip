import { InputType, Field, Int } from 'type-graphql';
import { Party } from '../../models/Party';
import GuestInput from './GuestInput';
import { Guest } from '../../models/Guest';

@InputType({description: 'new party data'})
export default class NewPartyInput implements Partial<Party> {
  @Field((type) => Int)
  maxSize!: number;

  @Field((type) => [GuestInput], {nullable: true})
  guests?: Guest[];
}
