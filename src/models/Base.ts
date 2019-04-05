import { Typegoose, prop } from 'typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({isAbstract: true})
export default class Base extends Typegoose {
  /**
   * Creation timestamp.
   */
  @prop()
  @Field()
  readonly createdAt!: Date;

  /**
   * Update timestamp.
   */
  @prop()
  @Field()
  readonly updatedAt!: Date;
}
