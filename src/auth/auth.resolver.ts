import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {AuthService} from './auth.service'
import {RegisterInput} from './dto/register.input'
import {UserObjectType} from '../users/types/user.type'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserObjectType)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput)
  }
}
