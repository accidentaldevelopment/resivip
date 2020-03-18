import { Resolver, Query, ObjectType, Field } from 'type-graphql';

@ObjectType()
class PingResult {
  @Field(__type => Boolean)
  r = true;
}

@Resolver()
export class PingResolver {
  @Query(__type => PingResult)
  ping() {
    return { r: true };
  }
}
