const airtable = require('airtable')
const stockdb = new airtable({
  apiKey: process.env.airtableKey
}).base('app2oVW62FODpXmq0')



const handler = async (event) => {
  return 123
}

module.exports = { handler }
