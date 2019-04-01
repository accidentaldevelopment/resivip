import Base from "./Base";
import { prop } from "typegoose";

export class Party extends Base {
  @prop({required: true})
  maxSize!: number;
}

const PartyModel = new Party().getModelForClass(Party, {
  schemaOptions: {
    timestamps: true
  }
});

export { PartyModel as default };
