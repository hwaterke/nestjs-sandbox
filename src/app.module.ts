import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {GraphQLModule} from '@nestjs/graphql'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthModule} from './auth/auth.module'
import {getDatabaseConfig} from './config/database.config'
import {isProduction} from './config/env'
import {HealthModule} from './health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return getDatabaseConfig(config)
      },
    }),
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
