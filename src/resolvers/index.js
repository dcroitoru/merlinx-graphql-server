const fetchUserById = (id) => ({ id, name: 'vasile' })

const { fetchCityByName, fetchOffers } = require('../rest')

const user = (root, args, context, info) => fetchUserById(args.id)

const autosuggest = (_, args) => fetchCityByName(args.name)

const offer = fetchOffers

const resolvers = {
  Query: { user, autosuggest, offer }
}

module.exports = resolvers
