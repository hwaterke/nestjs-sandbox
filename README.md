<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## TODO

- Add tool to manually generate schema without running the app. (for frontend
  codegen) https://docs.nestjs.com/graphql/generating-sdl
  https://stackoverflow.com/questions/67298396/nest-js-graphql-schema-generation-during-build
- Custom eslint rule to enforce either a @UseGuards(GqlAuthGuard) or a
  permission check or a public annotation (also error if public on a query but
  resolver has auth guard)
- Snake case naming strategy for typeorm
  https://github.com/tonivj5/typeorm-naming-strategies/blob/master/src/snake-naming.strategy.ts
- Add docker build script and push and shit. Multi arch build script
  `docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t hwaterke/sec:latest --push .`
