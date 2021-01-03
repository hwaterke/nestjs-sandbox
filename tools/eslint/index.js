const typeormEntityFilename = require('./rules/typeorm-entity-filename')

const ruleDefinitions = [typeormEntityFilename()]

const prefix = 'custom'

const rules = ruleDefinitions.reduce(
  (all, rule) => ({
    ...all,
    [rule.name]: rule.implementation,
  }),
  {}
)

const configs = {
  recommended: {
    rules: ruleDefinitions.reduce(
      (all, rule) => ({
        ...all,
        [`${prefix}/${rule.name}`]:
          rule.recommended === 'warn'
            ? 1
            : rule.recommended === 'error'
            ? 2
            : 0,
      }),
      {}
    ),
  },
}

module.exports = {
  rules,
  configs,
}
