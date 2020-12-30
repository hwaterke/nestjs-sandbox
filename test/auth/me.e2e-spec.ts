import {Test, TestingModule} from '@nestjs/testing'
import {gql} from 'apollo-server-express'
import {Connection} from 'typeorm'
import {AppModule} from '../../src/app.module'
import {AuthService} from '../../src/auth/auth.service'
import {TestingUtils} from '../utils/testing.utils'

const ME_QUERY = gql`
  query me {
    me {
      email
    }
  }
`

describe('AuthResolver.me (e2e)', () => {
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

  it('should fail without a token', async () => {
    const result = await testUtils.apolloClient.query({
      query: ME_QUERY,
    })

    expect(result).toMatchSnapshot()
  })

  it('should fail with an invalid JWT token', async () => {
    testUtils.token = '123'

    const result = await testUtils.apolloClient.query({
      query: ME_QUERY,
    })

    expect(result).toMatchSnapshot()
  })

  it('should fail with a JWT token for an non existing user', async () => {
    testUtils.token = authService.generateJWT(
      'dddb7a72-7bf3-4bc4-a67f-ed46058fa018'
    )

    const result = await testUtils.apolloClient.query({
      query: ME_QUERY,
    })

    expect(result).toMatchSnapshot()
  })

  it('should return the current user', async () => {
    const registration = await authService.register({
      email: 'test@example.com',
      password: '12345678',
    })

    testUtils.token = registration.token

    const result = await testUtils.apolloClient.query({
      query: ME_QUERY,
    })

    expect(result).toMatchSnapshot()
  })
})
