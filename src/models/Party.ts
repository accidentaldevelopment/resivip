import Base from "./Base";
import { prop, arrayProp, pre } from "typegoose";
import { Guest } from "./Guest";

@pre<Party>('validate', function(next) {
  if (this.guests.length > this.maxSize) {
    this.invalidate('guests', 'Path `guests` cannot be longer than `maxSize` (' + this.maxSize + ')');
  }
  next();
})
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
