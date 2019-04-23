import { InputType, Field } from 'type-graphql';
import GuestInput from './GuestInput';
import { Guest } from '../../models/Guest';
import { Meal } from '../../models/Meal';

@InputType()
class StrictGuestInput {
  @Field()
  name!: string;

  @Field((type) => Meal)
  meal!: Meal
}

@InputType()
export default class RsvpInput {
  @Field({description: '_id for the party, as returned by a party or parties query.'})
  _id!: String;

  @Field()
  isAttending!: boolean;

  @Field((type) => [StrictGuestInput])
  guests!: Guest[]
}
