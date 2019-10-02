import Base from './Base';
import { prop, arrayProp, pre } from 'typegoose';
import { Guest } from './Guest';
import { validateGuestLength, validateGuestUniqueness } from './validators';
import { ObjectType, Field, Int } from 'type-graphql';
import { Response } from './Response';

@pre<Party>('validate', validateGuestLength)
@pre<Party>('validate', validateGuestUniqueness)
@ObjectType()
export class Party extends Base {
  @Field()
  // tslint:disable-next-line:variable-name
  readonly _id?: string;

  @prop({required: false, unique: true, sparse: true})
  @Field((type) => String, {description: 'Arbitrary name of party.', nullable: true})
  name!: string;

  @prop({required: true, min: 1})
  @Field((type) => Int, {description: 'Maximum number of guests allowed in this party.'})
  maxSize!: number;

  @prop({default: Response.NO_RESPONSE})
  @Field((type) => Response, { defaultValue: Response.NO_RESPONSE})
  isAttending!: Response;

  @arrayProp({items: Guest})
  @Field((type) => [Guest], {description: 'List of guests in party.'})
  guests: Guest[] = [];
}

const PartyModel = new Party().getModelForClass(Party, {
  schemaOptions: {
    collation: {
      locale: 'en',
      strength: 1
    },
    timestamps: true
  }
});

export { PartyModel as default };
