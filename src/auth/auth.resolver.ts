import {UseGuards} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {User} from '../users/entities/user.entity'
import {UserObjectType} from '../users/types/user.type'
import {AuthService} from './auth.service'
import {CurrentUser} from './current-user.decorator'
import {LoginInput} from './dto/login.input'
import {RegisterInput} from './dto/register.input'
import {UserWithTokenObjectType} from './dto/user-with-token.type'
import {GqlAuthGuard} from './gql-auth-guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithTokenObjectType)
  register(
    @Args() registerInput: RegisterInput
  ): Promise<UserWithTokenObjectType> {
    return this.authService.register(registerInput)
  }

  @Mutation(() => UserWithTokenObjectType)
  login(@Args() loginInput: LoginInput): Promise<UserWithTokenObjectType> {
    return this.authService.login(loginInput)
  }

  @Query(() => UserObjectType)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User): User {
    return user
  }
}
