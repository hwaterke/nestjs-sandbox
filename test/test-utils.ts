import {createTestClient} from 'apollo-server-testing'
import {getApolloServer} from '@nestjs/graphql'
import {TestingModule} from '@nestjs/testing'
import {ValidationPipe} from '@nestjs/common'

export const createNestApplicationAndApolloTestClient = async (
  testingModule: TestingModule
) => {
  const app = testingModule.createNestApplication()
  app.useGlobalPipes(new ValidationPipe())
  await app.init()

  // @ts-expect-error: Discrepancy of apollo-server-core version between @nestjs/graphql and apollo-server-testing
  const apolloClient = createTestClient(getApolloServer(testingModule))

  return {
    app,
    apolloClient,
  }
}
