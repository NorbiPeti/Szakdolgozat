module.exports = {
  schema: 'http://backend:3000/graphql',
  documents: "src/app/graphql/**/*.graphql",
  extensions: {
    codegen: {
      generates: {
        "src/app/services/graphql.ts": {
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-apollo-angular"
          ]
        },
        "./graphql.schema.json": {
          plugins: ["introspection"]
        }
      }
    }
  }
}
