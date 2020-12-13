import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('Health')
export class HealthObjectType {
  @Field()
  nodeEnv!: string
}
