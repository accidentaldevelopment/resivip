import { registerEnumType } from 'type-graphql';

export enum Meal {
  HALIBUT = 'Halibut',
  STEAK = 'Steak'
}

registerEnumType(Meal, {
  name: 'Meal',
  description: 'Meal chosen by the guest'
});
