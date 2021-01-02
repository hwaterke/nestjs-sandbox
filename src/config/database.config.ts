import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ENTITIES} from './entities'
import {nodeEnv} from './env'

const testDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: ENTITIES,
  synchronize: true,
}

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  if (nodeEnv() === 'test') {
    return testDatabaseConfig
  }

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    entities: ENTITIES,
    synchronize: true,
  }
}
