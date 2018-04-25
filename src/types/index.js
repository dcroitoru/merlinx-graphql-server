const typeDefs = 
`
  type Query {
    user(id: ID!): User
    autosuggest(name: String!): [City]
    offer: [Offer]
  }
  type User {
    id: ID!
    name: String
  }

  # This is a city
  type City {
    cityId: ID!
    cityName: String
    lat: String
    lng: String
  }

  # This is an offer
  type Offer {
    id: ID!
    price: String
    operCurr: String
  }
`

module.exports = typeDefs

// const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql')
// const OfferType = new GraphQLObjectType({
//   name: 'Offer',
//   description: 'This represent an offer',
//   fields: () => ({
//     id: { type: new GraphQLNonNull(GraphQLString) },
//     operCurr: { type: new GraphQLNonNull(GraphQLString) },
//     price: { type: new GraphQLNonNull(GraphQLString) },
//     obj_city: { type: GraphQLString }
//   })
// })

// const CityType = new GraphQLObjectType({
//   name: 'City',
//   description: 'This represent a city',
//   fields: () => ({
//     cityId: { type: new GraphQLNonNull(GraphQLString) },
//     cityName: { type: new GraphQLNonNull(GraphQLString) },
//     lat: { type: GraphQLString },
//     lng: { type: GraphQLString }
//   })
// })

// module.exports = { OfferType, CityType }