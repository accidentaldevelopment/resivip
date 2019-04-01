import { Typegoose, prop } from 'typegoose';

export interface TimestampedDocument {
  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export default class Base extends Typegoose implements TimestampedDocument {
  @prop()
  readonly createdAt!: Date;

  @prop()
  readonly updatedAt!: Date;
}
