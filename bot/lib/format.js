var data = function (data) {

    console.log("-----")
    this.name = data.c + data.n
    this.fullname = data.c + '名稱:' + data.nf
    this.hight = '最高價:' + data.h 
    this.lock = '漲停價:' + data.u
    this.low = '最低價:' + data.l
    this.down = '跌停價:' + data.w
    this.now_qty = '當盤成交量:' + data.tv 
    this.all_qty = '累積成交量:' + data.v
    this.yd = '昨收價:' + getprice(data.y)
    this.now_buy = '現買價:' + getprice(data.b)
    this.now_sell = '現賣價:'+ getprice(data.a)
    this.now_level = '漲跌:' + (getprice(data.b) - getprice(data.y))
    this.now_sell_amont = '現賣量:' + getprice(data.f) 
    this.now_buy_amont = '現買量:' + getprice(data.g)
    this.disc = '最低手續費用計算:' + getfee(data.b)
    this.tick = getick(data.b)

   
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

    msg = msgArray.join("\n")
    console.info("msg ",msg)
    return msg
}

// 取價
function getprice(price) {
    if(price.includes("_")){
        return parseFloat(price.split("_", 1))
    }
    return parseFloat(price)
}

// 手續費
function getfee(price) {
    let fee = getprice(price) * 1000 * 0.2697/100
    return fee.toFixed(2)
}

// 檔位判斷
function getpart(price) {
    price = getprice(price)
    return price<10?0.01:(price<50?0.05:(price<100?0.1:(price<500?0.5:(price<1000?1:5))))
}

//輸出標價資訊
function getick(price) {
    price = getprice(price)
    let disc = getfee(price)
    let level = getpart(price)
    let part = Math.ceil(disc/(level*1000))
    let inc_price = price + (part*level)
    let msg = '最少要跳'+part+'檔,'+increase_price.toFixed(2)+'賣出'
    return msg
}

module.exports = data
