import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import {ENTITIES} from './entities'
import {nodeEnv} from './env'

const devDatabaseConfig: TypeOrmModuleOptions = {
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

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => {
  switch (nodeEnv()) {
    case 'development':
      return devDatabaseConfig
    case 'test':
      return testDatabaseConfig
    case 'production':
      return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'postgres',
        entities: ENTITIES,
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/database/migrations/*.{ts,js}'],
      }
  }
}
