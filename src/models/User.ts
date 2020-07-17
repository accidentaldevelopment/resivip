import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true, unique: true, _id: true })
  name!: string;
}
