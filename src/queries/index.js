const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql')
const Parser = require('xml2js')

const fetch = require('node-fetch')
const { CityType, OfferType } = require('../types')

const base = 'http://mdsws.merlin-x.ro'
const url = {
  data: `${base}/dataV3/`,
  autosuggest: `${base}/autosuggestV2/`
}

const headers = {
  'content-type': 'application/xml'
}

const method = 'POST'

const bodyPre = `<?xml version='1.0'?><mds><auth><login>16412</login><pass>settour</pass></auth><request>`
const bodyPost = `</request></mds>`

const offers = {
  type: new GraphQLList(OfferType),
  description: 'List of all Offers',

  resolve: () => {
    return new Promise((resolve, reject) => {
      fetch(url.data, {
        method,
        headers,
        body: `${bodyPre}
   <selectAnswerFields>ofr_id,obj_name,obj_city,ofr_price,ofr_operCurr,par_adt</selectAnswerFields>
 <type>offers</type>
 <conditions>
   <ofr_tourOp>DER</ofr_tourOp>
   <limit_count>20</limit_count>
   <order_by>obj_name</order_by>
 </conditions>
 ${bodyPost}
`
      })
        .then((res) => res.text())
        .then((body) =>
          Parser.parseString(body, (err, result) => {
            console.log(result.response)
            resolve(result.response.ofr.map((o) => o.$))
          })
        )
    })
  }
}

const autosuggest = {
  type: new GraphQLList(CityType),
  description: 'List of all Offers',
  resolve: (obj, args, context) => {
    console.log(obj, args, context)
    return new Promise((resolve, reject) => {
      fetch(url.autosuggest, {
        method,
        headers,
        body: `${bodyPre}
        <type>citySearchByName</type>
        <conditions>
          <language>EN</language>
          <name>madr</name>
        </conditions>
 ${bodyPost}
`
      })
        .then((res) => res.text())
        .then((body) =>
          Parser.parseString(body, (err, result) => {
            console.log(result.response)
            resolve(result.response.item.map((o) => o.$))
          })
        )
    })
  }
}

module.exports = {
  offers, autosuggest
}