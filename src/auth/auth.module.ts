import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthResolver} from './auth.resolver'
import {User} from '../users/entities/user.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
