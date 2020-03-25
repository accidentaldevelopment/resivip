import { InputType, Field } from 'type-graphql';
import { Guest } from '../../models/Guest';
import { Meal } from '../../models/Meal';
import { Response } from '../../models/Response';

@InputType()
class StrictGuestInput {
  @Field()
  name!: string;

  @Field((__type) => Meal)
  meal!: Meal;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export default class RsvpInput {
  @Field({
    description: '_id for the party, as returned by a party or parties query.',
  })
  _id!: string;

  @Field((__type) => Response)
  isAttending!: Response;

  @Field((__type) => [StrictGuestInput])
  guests!: Guest[];
}
