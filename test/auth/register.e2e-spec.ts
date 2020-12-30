import {Test, TestingModule} from '@nestjs/testing'
import {gql} from 'apollo-server-express'
import {Connection} from 'typeorm'
import {AppModule} from '../../src/app.module'
import {TestingUtils} from '../utils/testing.utils'

const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        email
      }
      token
    }
  }
`

describe('AuthResolver.register (e2e)', () => {
  let connection: Connection
  let testUtils: TestingUtils

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    testUtils = await TestingUtils.initNestApplication(moduleFixture)

    connection = moduleFixture.get(Connection)
  })

  afterEach(() => {
    testUtils.token = null
    return connection.synchronize(true)
  })

  afterAll(() => {
    return testUtils.close()
  })

  it('should be allowed to register', async () => {
    const result = await testUtils.apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: 'test@example.com',
        password: '12345678',
      },
    })

    expect(result.errors).toBeUndefined()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.register.user).toMatchSnapshot()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(result.data.register.token).toBeDefined()
  })

  it('should not be allowed to register with an invalid email', async () => {
    const result = await testUtils.apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: 'test',
        password: '12345678',
      },
    })

    expect(result).toMatchSnapshot()
  })

  it('should not be allowed to register with password too short', async () => {
    const result = await testUtils.apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: 'test@example.com',
        password: '1234567',
      },
    })

    expect(result).toMatchSnapshot()
  })

  it('should not be allowed to register with an already used email', async () => {
    await testUtils.apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: 'test@example.com',
        password: '12345678',
      },
    })

    const result = await testUtils.apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        email: 'test@example.com',
        password: '12345678',
      },
    })

    expect(result).toMatchSnapshot()
  })
})
