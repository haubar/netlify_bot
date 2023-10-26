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
        let urls
        if(id == '00' || id == 0) {
          urls = ['https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t'+ id +'.tw&json=1&delay=0']
        } else {
          urls = [
            'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_'+ id +'.tw&json=1&delay=0',
            'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=otc_'+ id +'.tw&json=1&delay=0'
          ]
        }

        // usernames.map(async (username) => {return await simulateFetchData(username);})
        Object.values(urls).map(url => {
            console.log(url)
            // let result = await getinfo(url)
            // if (condition) {
              
            // }
        })

    } catch (error) {
        return "出錯囉" + id
    } 
}


async function getinfo(url) {
    await rp( {'uri': url} ).then(function(response) {
      let res = JSON.parse(response)
      let info = res.msgArray[0] | ""
      if(!!info){
          console.log(info)
          return new format(info)
      }
      return info
    })
}

async function getinfopromiss(url) {
    return result = await Promise.all(urls.map(url => fetch(url)))
      .then(res => res.json())
      .then(res => {
          return res.msgArray[0]
      })
      .catch(err => {
        console.log("沒有這筆代號資料喲, 咩噗Q口Q")
      }) 
}



module.exports = { getstock, findstock }
