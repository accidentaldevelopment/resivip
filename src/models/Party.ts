import Base from './Base';
import { prop, arrayProp, pre, getModelForClass } from '@typegoose/typegoose';
import { Guest } from './Guest';
import { validateGuestLength, validateGuestUniqueness } from './validators';
import { ObjectType, Field, Int } from 'type-graphql';
import { Response } from './Response';

@pre<Party>('validate', validateGuestLength)
@pre<Party>('validate', validateGuestUniqueness)
@ObjectType()
export class Party extends Base {
  @Field()
  readonly _id?: string;

  @prop({ required: false, unique: true, sparse: true })
  @Field(__type => String, {
    description: 'Arbitrary name of party.',
    nullable: true,
  })
  name!: string;

  @prop({ required: true, min: 1 })
  @Field(__type => Int, {
    description: 'Maximum number of guests allowed in this party.',
  })
  maxSize!: number;

  @prop({ default: Response.NO_RESPONSE })
  @Field(__type => Response, { defaultValue: Response.NO_RESPONSE })
  isAttending!: Response;

  @arrayProp({ items: Guest })
  @Field(__type => [Guest], { description: 'List of guests in party.' })
  guests: Guest[] = [];
}

const PartyModel = getModelForClass(Party, {
  schemaOptions: {
    collation: {
      locale: 'en',
      strength: 1,
    },
    timestamps: true,
  },
});

export { PartyModel as default };
