import {ArgsType, Field} from '@nestjs/graphql'
import {IsEmail} from 'class-validator'

@ArgsType()
export class LoginInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  password!: string
}
