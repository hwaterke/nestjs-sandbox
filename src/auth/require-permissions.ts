import {SetMetadata} from '@nestjs/common'
import {Permission} from './permission'

export const PERMISSIONS_METADATA_KEY = 'permissions'

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions)
