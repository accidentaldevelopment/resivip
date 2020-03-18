import { registerEnumType } from 'type-graphql';

export enum Meal {
  HALIBUT = 'Halibut',
  STEAK = 'Steak',
  VEGAN = 'Vegetarian/Vegan',
  KIDS_MEAL = 'Kids Meal',
}

registerEnumType(Meal, {
  name: 'Meal',
  description: 'Meal chosen by the guest',
});
