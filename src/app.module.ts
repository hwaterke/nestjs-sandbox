import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {databaseConfig} from './config/database.config'
import {GraphQLModule} from '@nestjs/graphql'
import {isProduction} from './config/env'
import {HealthModule} from './health/health.module'
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot({
      debug: !isProduction(),
      playground: !isProduction(),
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}
