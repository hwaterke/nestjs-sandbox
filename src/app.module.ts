import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import {databaseConfig} from './config/database.config'
import {GraphQLModule} from '@nestjs/graphql'
import {isProduction} from './config/env'
import {HealthModule} from './health/health.module'
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
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
