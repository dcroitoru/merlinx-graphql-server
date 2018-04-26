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