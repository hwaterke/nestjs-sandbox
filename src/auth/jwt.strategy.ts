import {Injectable, UnauthorizedException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import {InjectRepository} from '@nestjs/typeorm'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {Repository} from 'typeorm'
import {User} from '../users/entities/user.entity'
import {JwtPayload} from './jwt.payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
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
