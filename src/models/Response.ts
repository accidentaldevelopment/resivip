import { registerEnumType } from 'type-graphql';

export enum Response {
  NO_RESPONSE,
  NOT_ATTENDING,
  ATTENDING,
}

registerEnumType(Response, {
  name: 'Response'
});
