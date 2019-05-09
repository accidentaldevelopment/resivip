import { Resolver, Query, ObjectType, Field } from 'type-graphql';

@ObjectType()
class PingResult {
  @Field((type) => Boolean)
  r = true;
}

// tslint:disable-next-line: max-classes-per-file
@Resolver()
export class PingResolver {
  @Query((type) => PingResult)
  ping() {
    return {r: true};
  }
}
