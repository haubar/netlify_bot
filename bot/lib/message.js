const airtable = require('airtable')
const stockdb = new airtable({
  apiKey: process.env.airtableKey
}).base('app2oVW62FODpXmq0')

const getstock = async (string) => {
  try {
    let filter = 'FIND("' +string+ '", {name}) > 0'
    const records = await base('stock_list').select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: filter
    }).all()
    
    return id = records[0].get('no') || 0
    
  } catch (error) {
    throw error
  }
}

const handler = async (event) => {
  try {
    //解析關鍵字
    const keyword = event.keyword.trim() || ""
    if(!isNaN(keyword)) {
      return 0
      // return getstock(keyword) || 0
    }
    return keyword
  } catch (error) {
    return 0
  }
}

module.exports = { handler }
