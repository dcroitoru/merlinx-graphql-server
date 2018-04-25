const fetchUserById = (id) => ({ id, name: 'vasile' })

const fetchCityByName = (name) => ({ name, id: '232323' })

const user = (root, args, context, info) => fetchUserById(args.id)

const autosuggest = (_, args) => fetchCityByName(args.name)

const resolvers = {
  Query: { user, autosuggest }
}

module.exports = resolvers
