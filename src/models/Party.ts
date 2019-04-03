import Base from './Base';
import { prop, arrayProp, pre } from 'typegoose';
import { Guest } from './Guest';
import { validateGuestLength, validateGuestUniqueness } from './validators';

@pre<Party>('validate', validateGuestLength)
@pre<Party>('validate', validateGuestUniqueness)
export class Party extends Base {
  @prop({required: true, min: 1})
  maxSize!: number;

  @arrayProp({items: Guest})
  guests: Guest[] = [];
}

const PartyModel = new Party().getModelForClass(Party, {
  schemaOptions: {
    timestamps: true
  }
});

export { PartyModel as default };
