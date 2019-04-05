import { Field, InputType } from 'type-graphql';
import { Guest } from '../../models/Guest';

@InputType({description: 'new guest data'})
export default class GuestInput implements Partial<Guest> {
  @Field()
  name!: string;
}
