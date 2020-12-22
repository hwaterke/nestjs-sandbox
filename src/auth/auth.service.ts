import {Injectable} from '@nestjs/common'
import {RegisterInput} from './dto/register.input'
import {UserObjectType} from '../users/types/user.type'
import {Repository} from 'typeorm'
import {User} from '../users/entities/user.entity'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import {LoginInput} from './dto/login.input'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async register(registerInput: RegisterInput): Promise<UserObjectType> {
    const emailAvailable = await this.isEmailAvailable(registerInput.email)
    if (!emailAvailable) {
      throw new Error('EMAIL_ALREADY_USED')
    }

    const hashedPassword = await this.hashPassword(registerInput.password)

    const user = this.userRepository.create({
      email: registerInput.email,
      password: hashedPassword,
    })

    return this.userRepository.save(user)
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepository.findOne({email: loginInput.email})

    if (user) {
      const passwordMatch = await this.checkPassword(
        loginInput.password,
        user.password
      )
      if (passwordMatch) {
        return user
      }
    }
    throw new Error('INCORRECT_EMAIL_OR_PASSWORD')
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12)
  }

  checkPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }

  async isEmailAvailable(email: string) {
    const totalEmails = await this.userRepository.count({email})
    return totalEmails === 0
  }
}
