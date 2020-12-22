import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('User')
export class UserObjectType {
  @Field()
  email!: string
}
