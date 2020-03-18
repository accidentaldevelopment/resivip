import { Typegoose, prop } from '@typegoose/typegoose';

export class User extends Typegoose {
  @prop({ required: true, unique: true, _id: true })
  name!: string;
}
