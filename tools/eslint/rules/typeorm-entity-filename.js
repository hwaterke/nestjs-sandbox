module.exports = () => ({
  name: 'typeorm-entity-filename',
  recommended: 'warn',
  implementation: {
    meta: {
      type: 'suggestion',
      messages: {
        message: `File with an @Entity must end .entity.ts`,
      },
    },
    create(context) {
      return {
        Decorator(node) {
          if (node.type === 'Decorator') {
            if (
              node.expression &&
              node.expression.callee &&
              node.expression.callee.name === 'Entity'
            ) {
              if (!context.getFilename().endsWith('.entity.ts')) {
                context.report({
                  node,
                  messageId: 'message',
                })
              }
            }
          }
        },
      }
    },
  },
})
