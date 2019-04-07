import { prop } from 'typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Meal } from './Meal';

@ObjectType()
export class Guest {
  @Field()
  // tslint:disable-next-line:variable-name
  readonly _id?: string;

  @prop({required: true, unique: true, sparse: true})
  @Field()
  name!: string;

  @prop({enum: Meal})
  @Field((type) => Meal)
  meal?: Meal;
}
