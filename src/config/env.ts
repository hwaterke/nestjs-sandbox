export const nodeEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production'
  }
  return 'development'
}

export const isProduction = () => {
  return nodeEnv() === 'production'
}
