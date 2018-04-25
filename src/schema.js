const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema } = require('graphql')
const { offers, autosuggest } = require('./queries')

// This is the Root Query
const RootQueryType = new GraphQLObjectType({
  name: 'AppSchema',
  description: 'Application Schema Root',
  fields: () => ({
    offers,
    autosuggest
  })
})

AppSchema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = AppSchema
