import { prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Meal } from './Meal';

@ObjectType()
export class Guest {
  @Field()
  readonly _id?: string;

  @prop({ required: true, unique: true, sparse: true })
  @Field()
  name!: string;

  @prop({ enum: Meal })
  @Field((__type) => Meal, { nullable: true })
  meal?: Meal;

  @prop({ required: false })
  @Field({ nullable: true })
  notes?: string;
}
