import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {GqlExecutionContext} from '@nestjs/graphql'
import {Permission} from './permission'
import {PERMISSIONS_METADATA_KEY} from './require-permissions'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)

    // Read the metadata
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_METADATA_KEY,
      [ctx.getHandler(), ctx.getClass()]
    )

    if (!requiredPermissions) {
      return true
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const {user} = ctx.getContext().req

    // TODO - Check if the user has the right permissions

    return true
  }
}
