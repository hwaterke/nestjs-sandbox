import {ValidationPipe} from '@nestjs/common'
import {NestApplication} from '@nestjs/core'
import {getApolloServer} from '@nestjs/graphql'
import {TestingModule} from '@nestjs/testing'
import {ApolloServerTestClient, createTestClient} from 'apollo-server-testing'

export class TestingUtils {
  private _app!: NestApplication
  private _token: string | null = null
  private _apolloClient!: ApolloServerTestClient

  constructor(private testingModule: TestingModule) {}

  static async initNestApplication(testingModule: TestingModule) {
    const utils = new TestingUtils(testingModule)
    await utils.init()
    return utils
  }

  async init() {
    this._app = this.testingModule.createNestApplication()
    this._app.useGlobalPipes(new ValidationPipe())
    await this._app.init()

    const apolloServer = getApolloServer(this.testingModule)
    // Update the context factory of the server
    apolloServer.requestOptions.context = () => {
      const headers = this._token
        ? {
            authorization: `Bearer ${this._token}`,
          }
        : {}

      return {
        req: {headers},
      }
    }

    this._apolloClient = createTestClient(apolloServer)
  }

  close() {
    return this._app.close()
  }

  get apolloClient() {
    return this._apolloClient
  }

  set token(token: string | null) {
    this._token = token
  }
}
