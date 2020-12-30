import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import {Repository} from 'typeorm'
import {User} from '../users/entities/user.entity'
import {LoginInput} from './dto/login.input'
import {RegisterInput} from './dto/register.input'
import {UserWithTokenObjectType} from './dto/user-with-token.type'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async register(
    registerInput: RegisterInput
  ): Promise<UserWithTokenObjectType> {
    const emailAvailable = await this.isEmailAvailable(registerInput.email)
    if (!emailAvailable) {
      throw new Error('EMAIL_ALREADY_USED')
    }

    const hashedPassword = await this.hashPassword(registerInput.password)

    const user = this.userRepository.create({
      email: registerInput.email,
      password: hashedPassword,
    })

    await this.userRepository.save(user)

    return {
      user,
      token: this.generateJWT(user.uuid),
    }
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepository.findOne({email: loginInput.email})

    if (user) {
      const passwordMatch = await this.checkPassword(
        loginInput.password,
        user.password
      )
      if (passwordMatch) {
        const token = this.generateJWT(user.uuid)

        return {
          user,
          token,
        }
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

  generateJWT(userUuid: string) {
    return this.jwtService.sign({uuid: userUuid})
  }
}
