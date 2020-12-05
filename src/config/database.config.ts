import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  entities: [],
  synchronize: true,
}
