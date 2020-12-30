import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('User')
export class UserObjectType {
  @Field()
  uuid!: string

  @Field()
  email!: string
}
