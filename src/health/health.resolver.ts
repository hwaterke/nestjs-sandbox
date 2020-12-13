import {Query, Resolver} from '@nestjs/graphql'
import {HealthObjectType} from './types/health.type'
import {nodeEnv} from '../config/env'

@Resolver()
export class HealthResolver {
  @Query(() => HealthObjectType)
  health(): HealthObjectType {
    return {
      nodeEnv: nodeEnv(),
    }
  }
}
