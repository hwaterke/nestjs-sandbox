import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ENTITIES} from './entities'
import {nodeEnv} from './env'

const developmentDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: ENTITIES,
  synchronize: true,
  logging: true,
}

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

export const databaseConfig =
  nodeEnv() === 'test' ? testDatabaseConfig : developmentDatabaseConfig
