const format = require('./format')
const airtable = require('airtable')
const axios = require('axios')
const rp = require('request-promise').defaults({ jar: true })

const stockdb = new airtable({
    apiKey: process.env.airtableKey
  }).base('app2oVW62FODpXmq0')

//找尋名稱
const getstock = async (string) => {
  try {
    let filter = 'FIND("' + string + '", {name}) > 0'
    // let filter = 'SEARCH("' + string + '", {name})'
    // let filter = 'SEARCH("' + string + '", {name})'
    const records = await stockdb('stock_list').select({
      maxRecords: 1,
      view: 'Grid view',
      filterByFormula: filter
    }).all()
    if(records.length > 0){
      return records[0].get('no')
    }
    return 0
   
  } catch (error) {
      throw error
  }
}

const findstock = async (id) => {
    try {
        let url
        if(id == '00' || id == 0) {
          url = 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t'+ id +'.tw&json=1&delay=0'
        } else {
          url = 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_'+ id +'.tw|otc_'+ id +'.tw&json=1&delay=0'
        }

        let res = await getinfo(url)
        if(!!res) {
            return res
        } 
        return '沒有 ' + id + ' 的資料'

    } catch (error) {
        return "出錯囉" + id
    } 
}


async function getinfo(url) {
    return rp.get(url).then(function(response) {
      let res = JSON.parse(response)
      let info = res.msgArray[0]
      if(!!info){
          return new format(info)
      }

    })
  
}



module.exports = { getstock, findstock }
