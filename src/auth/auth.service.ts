import {Injectable} from '@nestjs/common'
import {RegisterInput} from './dto/register.input'
import {UserObjectType} from '../users/types/user.type'
import {Repository} from 'typeorm'
import {User} from '../users/entities/user.entity'
import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  register(registerInput: RegisterInput): Promise<UserObjectType> {
    const user = this.userRepository.create({
      email: registerInput.email,
      password: registerInput.password,
    })

    return this.userRepository.save(user)
  }
}
