import { Typegoose, prop } from 'typegoose';

export default class Base extends Typegoose {
  @prop()
  readonly createdAt!: Date;

  @prop()
  readonly updatedAt!: Date;
}
