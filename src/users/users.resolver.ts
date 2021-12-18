import {UseGuards} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {GqlAuthGuard} from '../auth/gql-auth-guard'
import {PermissionGuard} from '../auth/permission.guard'
import {RequirePermissions} from '../auth/require-permissions'
import {Permission} from '../auth/permission'
import {UserObjectType} from './types/user.type'
import {UsersService} from './users.service'

@Resolver(() => UserObjectType)
@UseGuards(GqlAuthGuard, PermissionGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @RequirePermissions(Permission.READ_USERS)
  @Query(() => [UserObjectType], {name: 'users'})
  findAll() {
    return this.usersService.findAll()
  }

  @Query(() => UserObjectType, {name: 'user'})
  findOne(@Args('uuid', {type: () => String}) uuid: string) {
    return this.usersService.findOne(uuid)
  }

  @Mutation(() => UserObjectType)
  removeUser(@Args('uuid', {type: () => String}) uuid: string) {
    return this.usersService.remove(uuid)
  }
}
