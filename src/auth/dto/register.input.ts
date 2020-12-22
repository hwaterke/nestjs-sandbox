import {Field, InputType} from '@nestjs/graphql'
import {IsEmail, MinLength} from 'class-validator'

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email!: string

  @MinLength(8)
  @Field()
  password!: string
}
