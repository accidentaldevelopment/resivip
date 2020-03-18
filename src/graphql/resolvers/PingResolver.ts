import { Resolver, Query, ObjectType, Field } from 'type-graphql';

@ObjectType()
class PingResult {
  @Field(_type => Boolean)
  r = true;
}

@Resolver()
export class PingResolver {
  @Query(_type => PingResult)
  ping() {
    return { r: true };
  }
}
