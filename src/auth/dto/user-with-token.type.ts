import {Field, ObjectType} from '@nestjs/graphql'
import {UserObjectType} from '../../users/types/user.type'

@ObjectType('UserWithToken')
export class UserWithTokenObjectType {
  @Field()
  user!: UserObjectType

  @Field()
  token!: string
}
