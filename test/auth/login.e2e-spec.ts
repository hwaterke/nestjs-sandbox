import {Test, TestingModule} from '@nestjs/testing'
import {gql} from 'apollo-server-express'
import {Connection} from 'typeorm'
import {AppModule} from '../../src/app.module'
import {AuthService} from '../../src/auth/auth.service'
import {TestingUtils} from '../utils/testing.utils'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`

describe('AuthResolver.login (e2e)', () => {
  let connection: Connection
  let authService: AuthService
  let testUtils: TestingUtils

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    testUtils = await TestingUtils.initNestApplication(moduleFixture)

    connection = moduleFixture.get(Connection)
    authService = moduleFixture.get(AuthService)
  })

  afterEach(() => {
    testUtils.token = null
    return connection.synchronize(true)
  })

  afterAll(() => {
    return testUtils.close()
  })

  it('should fail with an non existing email', async () => {
    const result = await testUtils.apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        email: 'test@example.com',
        password: '12345678',
      },
    })

    expect(result).toMatchSnapshot()
  })

  it('should return the current user and a token', async () => {
    await authService.register({
      email: 'test@example.com',
      password: '12345678',
    })

    const result = await testUtils.apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        email: 'test@example.com',
        password: '12345678',
      },
    })

    expect(result.errors).toBeUndefined()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.login.user).toMatchSnapshot()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.login.token).toBeDefined()
  })
})
