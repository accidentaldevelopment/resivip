import { InputType, Field } from 'type-graphql';
import { Guest } from '../../models/Guest';
import { Meal } from '../../models/Meal';

@InputType()
class StrictGuestInput {
  @Field()
  name!: string;

  @Field((type) => Meal)
  meal!: Meal;
}

// tslint:disable-next-line:max-classes-per-file
@InputType()
export default class RsvpInput {
  @Field({description: '_id for the party, as returned by a party or parties query.'})
  // tslint:disable-next-line:variable-name
  _id!: string;

  @Field()
  isAttending!: boolean;

  @Field((type) => [StrictGuestInput])
  guests!: Guest[];
}
