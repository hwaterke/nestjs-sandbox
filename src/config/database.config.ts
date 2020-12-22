import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ENTITIES} from './entities'

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

export const databaseConfig = developmentDatabaseConfig
