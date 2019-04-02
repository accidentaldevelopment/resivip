import { prop } from 'typegoose';

export class Guest {
  @prop({required: true, unique: true})
  name!: string;
}
