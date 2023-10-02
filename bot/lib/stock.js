const airtable = require('airtable')
const stockdb = new airtable({
    apiKey: process.env.airtableKey
  }).base('app2oVW62FODpXmq0')

//找尋名稱
const getstock = async (string) => {
  console.info("string",string)
  try {
    let filter = 'FIND("' + string + '", {name}) > 0'
    // let filter = 'SEARCH("' + string + '", {name})'
    // let filter = 'SEARCH("' + string + '", {name})'
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



module.exports = { getStock }
