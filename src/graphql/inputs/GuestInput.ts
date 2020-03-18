import { Field, InputType } from 'type-graphql';
import { Guest } from '../../models/Guest';
import { Meal } from '../../models/Meal';

@InputType({ description: 'new guest data' })
export default class GuestInput implements Partial<Guest> {
  @Field()
  name!: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(_type => Meal, { nullable: true })
  meal?: Meal;
}
