const airtable = require('airtable')
const stockdb = new airtable({
    apiKey: process.env.airtableKey
  }).base('app2oVW62FODpXmq0')

//找尋名稱
const getstock = async (string) => {
  return string
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


    /********* */

    {
   
        if(id == '0000') {
            let stock_tai = {
                  uri: 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_t00.tw&json=1&delay=0'
            }
            rp(stock_tai).then(function(response) {
                  let res = JSON.parse(response)
                  let info = res.msgArray[0]
                  if(!!info){
                      let name = info.c+info.n
                      let fullname = info.c+'名稱:'+info.n
                      let hight = '最高價:'+info.h
                      let low = '最低價:'+info.l
                      let all_qty = '累積成交量:'+info.v
                      let yd = '昨收價:'+info.y
                      let now_buy = '現價:'+ info.z
                      let now_level = '漲跌:'+ (parseFloat(info.z) - parseFloat(info.y))
                      let msg = name +" \n"+fullname +" \n"+ now_buy +" \n"+ hight +" \n"+ low+" \n"+all_qty+" \n"+yd+" \n"+now_level
                    
                      return event.reply(msg)
                  }
                  return event.reply(stock_id)    
            })
        }
    
        let stock_tse = {
          uri: 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_'+stock_id+'.tw&json=1&delay=0'
        }
        let stock_otc = {
          uri: 'https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=otc_'+stock_id+'.tw&json=1&delay=0'
        }
        
        rp(stock_tse).then(function(response) {
            let res = JSON.parse(response)
            let info = res.msgArray[0]
            if(!!info){
                let name = info.c+info.n
                        let fullname = info.c+'名稱:'+info.nf
                        let hight = '最高價:'+info.h
                        let lock = '漲停價:'+info.u
                        let low = '最低價:'+info.l
                        let down = '跌停價:'+info.w
                        let now_qty = '當盤成交量:'+info.tv
                        let all_qty = '累積成交量:'+info.v
                        let yd = '昨收價:'+info.y
                        let now_buy = '現買價:'+ (info.b).split("_", 1)
                        let now_sell = '現賣價:'+ (info.a).split("_", 1)
                        let now_level = '漲跌:'+ (parseFloat((info.b).split("_", 1)) - parseFloat(info.y))
                        let now_sell_amont = '現賣量:'+ (info.f).split("_", 1)
                        let now_buy_amont = '現買量:'+ (info.g).split("_", 1)
                        let disc = '最低手續費用計算:'+ (parseFloat((info.b).split("_", 1))*1000*0.2697/100)
                        let tick = getick((info.b).split("_", 1))
                        let msg = name +" \n"+fullname +" \n"+now_level +" \n"+ now_buy +" \n"+ now_buy_amont +" \n"+ now_sell +" \n"+ now_sell_amont +" \n"+ hight +" \n"+ lock +" \n"+low+" \n"+ down +" \n"+now_qty+" \n"+all_qty+" \n"+disc+" \n"+ tick
                        return event.reply(msg)
            }else{
                rp(stock_otc).then(function(response) {
                    let res = JSON.parse(response)
                    let info = res.msgArray[0]
                    if(!!info){
                        let name = info.c+info.n
                        let fullname = info.c+'名稱:'+info.nf
                        let hight = '最高價:'+info.h
                        let lock = '漲停價:'+info.u
                        let low = '最低價:'+info.l
                        let down = '跌停價:'+info.w
                        let now_qty = '當盤成交量:'+info.tv
                        let all_qty = '累積成交量:'+info.v
                        let yd = '昨收價:'+info.y
                        let now_buy = '現買價:'+ (info.b).split("_", 1)
                        let now_sell = '現賣價:'+ (info.a).split("_", 1)
                        let now_level = '漲跌:'+ (parseFloat((info.b).split("_", 1)) - parseFloat(info.y))
                        let now_sell_amont = '現賣量:'+ (info.f).split("_", 1)
                        let now_buy_amont = '現買量:'+ (info.g).split("_", 1)
                        let disc = '最低手續費用計算:'+ (parseFloat((info.b).split("_", 1))*1000*0.2697/100)
                        let tick = getick((info.b).split("_", 1))
                        let msg = name +" \n"+fullname+" \n"+now_level +" \n"+ now_buy +" \n"+ now_buy_amont +" \n"+ now_sell +" \n"+ now_sell_amont +" \n"+ hight +" \n"+ lock +" \n"+low+" \n"+ down +" \n"+now_qty+" \n"+all_qty+" \n"+disc+" \n"+ tick
                        return event.reply(msg)
                    } else {
                        return event.reply('沒有這筆代號資料喲, 咩噗Q口Q')
                    }
                }).catch(function (err) {
                    return event.reply('沒有這筆代號資料喲, 咩噗Q口Q')
                })
            }
        }).catch(function (err) {
            return event.reply('沒有這筆代號資料喲, 咩噗Q口Q')        
        })
    }
    

    /********** */
    return id
  } catch (error) {
      throw error
  }
}



module.exports = { getstock, findstock }
