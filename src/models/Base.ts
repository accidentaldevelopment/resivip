import { Typegoose, prop } from 'typegoose';

export default class Base extends Typegoose {
  /**
   * Creation timestamp.
   */
  @prop()
  readonly createdAt!: Date;

  /**
   * Update timestamp.
   */
  @prop()
  readonly updatedAt!: Date;
}
