import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {AuthService} from './auth.service'
import {AuthResolver} from './auth.resolver'
import {User} from '../users/entities/user.entity'
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {JwtStrategy} from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
        }
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
