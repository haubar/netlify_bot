let data = function (data) {
  
    this.name = data.c + data.n
    this.fullname = data.c + '名稱:' + data.nf
    this.hight = '最高價:' + data.h | ""
    this.lock = '漲停價:' + data.u | ""
    this.low = '最低價:' + data.l | ""
    this.down = '跌停價:' + data.w | ""
    this.now_qty = '當盤成交量:' + data.tv | ""
    this.all_qty = '累積成交量:' + data.v | ""
    this.yd = '昨收價:' + parseFloat(data.y) 
    this.now_buy = '現買價:' + getprice(data.b) | ""
    this.now_sell = '現賣價:'+ getprice(data.a) | ""
    this.now_level = '漲跌:' + (getprice(data.b) - parseFloat(data.y)) | ""
    this.now_sell_amont = '現賣量:' + getprice(data.f) | ""
    this.now_buy_amont = '現買量:' + getprice(data.g) | ""
    this.disc = '最低手續費用計算:' + getprice(data.b)*1000*0.2697/100 | ""
    this.tick = getick(data.b) | ""
    
    let msgArray = [ this.name, 
                     this.fullname, 
                     this.now_level, 
                     this.now_buy, 
                     this.now_buy_amont, 
                     this.now_sell, 
                     this.now_sell_amont, 
                     this.hight,
                     this.lock, 
                     this.low, 
                     this.down,
                     this.now_qty, 
                     this.all_qty, 
                     this.disc, 
                     this.tick ]

    this.msg = msgArray.join("\n")
}


function getprice(price) {
    return parseFloat((price).split("_", 1))
}

function getick(price) {
    return getprice(price) * 1000 * 0.2697/100
}


module.exports = data
