import {Injectable, UnauthorizedException} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {InjectRepository} from '@nestjs/typeorm'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {Repository} from 'typeorm'
import {User} from '../users/entities/user.entity'
import {JwtPayload} from './jwt.payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? 's3cr3t',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne(payload.uuid)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
