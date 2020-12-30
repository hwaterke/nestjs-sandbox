import {Module} from '@nestjs/common'
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
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 's3cr3t',
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
