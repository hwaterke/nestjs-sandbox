import {ObjectType, Field, Int} from '@nestjs/graphql'

@ObjectType('User')
export class UserObjectType {
  @Field()
  email!: string
}
