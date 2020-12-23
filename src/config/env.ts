export const nodeEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'production'
    case 'test':
      return 'test'
    default:
      return 'development'
  }
}

export const isProduction = () => {
  return nodeEnv() === 'production'
}
