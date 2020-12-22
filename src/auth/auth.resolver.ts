import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {AuthService} from './auth.service'
import {RegisterInput} from './dto/register.input'
import {UserObjectType} from '../users/types/user.type'
import {LoginInput} from './dto/login.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserObjectType)
  register(@Args() registerInput: RegisterInput) {
    return this.authService.register(registerInput)
  }

  @Mutation(() => UserObjectType)
  login(@Args() loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }
}
