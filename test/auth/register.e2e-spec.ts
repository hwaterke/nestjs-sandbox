import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import {ApolloServerTestClient} from 'apollo-server-testing'
import {gql} from 'apollo-server-express'
import {AppModule} from '../../src/app.module'
import {createNestApplicationAndApolloTestClient} from '../test-utils'
import {Connection} from 'typeorm'

const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
    }
  }
`

describe('AuthResolver.register (e2e)', () => {
  let app: INestApplication
  let apolloClient: ApolloServerTestClient
  let connection: Connection

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    ;({app, apolloClient} = await createNestApplicationAndApolloTestClient(
      moduleFixture
    ))

    connection = moduleFixture.get(Connection)
  })

  afterEach(() => {
    return connection.synchronize(true)
  })

  afterAll(() => {
    return app.close()
  })

  describe('Authentication', () => {
    it('should be allowed to register', async () => {
      const result = await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          email: 'test@example.com',
          password: '12345678',
        },
      })
      expect(result).toMatchSnapshot()
    })

    it('should not be allowed to register with an invalid email', async () => {
      const result = await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          email: 'test',
          password: '12345678',
        },
      })

      expect(result).toMatchSnapshot()
    })

    it('should not be allowed to register with password too short', async () => {
      const result = await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          email: 'test@example.com',
          password: '1234567',
        },
      })

      expect(result).toMatchSnapshot()
    })

    it('should not be allowed to register with an already used email', async () => {
      await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          email: 'test@example.com',
          password: '12345678',
        },
      })

      const result = await apolloClient.mutate({
        mutation: REGISTER,
        variables: {
          email: 'test@example.com',
          password: '12345678',
        },
      })

      expect(result).toMatchSnapshot()
    })
  })
})
