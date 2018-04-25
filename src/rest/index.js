const Parser = require('xml2js')
const fetch = require('node-fetch')

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

const fetchCityByName = (name) => {
  return new Promise((resolve, reject) => {
    fetch(url.autosuggest, {
      method,
      headers,
      body: `${bodyPre}
      <type>citySearchByName</type>
      <conditions>
        <language>EN</language>
        <name>${name}</name>
      </conditions>
${bodyPost}
`
    })
      .then((res) => res.text())
      .then((body) =>
        Parser.parseString(body, (err, result) => {
          let mapping = result.response.item.map((o) => o.$)
          console.log(mapping)
          resolve(mapping)
        })
      )
  })
}

const fetchOffers = () => {
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
          let mapping = result.response.ofr.map((o) => o.$)
          console.log(mapping)
          resolve(mapping)
        })
      )
  })
}

module.exports = {
  fetchCityByName, fetchOffers
}

// fetchCityByName('bar')
