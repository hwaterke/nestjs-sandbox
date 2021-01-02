FROM node:14-alpine AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["yarn", "run", "start:prod"]
