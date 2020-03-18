import { registerEnumType } from 'type-graphql';

export enum Response {
  NO_RESPONSE = 0,
  NOT_ATTENDING = 1,
  ATTENDING = 2,
}

registerEnumType(Response, {
  name: 'Response',
});
