var data = function (data) {
  
    if (!data || !(typeof data === "object")) {
        return false
    } 

    if (typeof data.u == 'undefined') {
        
           this.name = data.c + data.n
           this.fullname = data.c + '名稱:' + data.n
           this.hight = '最高價:'+data.h
           this.low = '最低價:'+data.l
           this.all_qty = '累積成交量:'+data.v
           this.yd = '昨收價:' + data.y
           this.now_buy = '現價:'+ data.z
           this.now_level = '漲跌:'+ (getprice(data.z) - getprice(data.y)).toFixed(2)

           return msgArray = [ 
                    this.name, 
                    this.fullname, 
                    this.now_buy, 
                    this.hight,
                    this.low, 
                    this.all_qty, 
                    this.yd, 
                    this.now_level
                ]

    }

    this.name = data.c + data.n
    this.fullname = data.c + '名稱:' + data.nf
    this.hight = '最高價:' + data.h
    this.lock = '漲停價:' + data.u
    this.low = '最低價:' + data.l
    this.down = '跌停價:' + data.w
    this.now_qty = '當盤成交量:' + data.tv 
    this.all_qty = '累積成交量:' + data.v
    this.yd = '昨收價:' + getprice(data.y)
    this.now_buy = '現買價:' + (getprice(data.b) || 0)
    this.now_sell = '現賣價:'+ (getprice(data.a) || 0)
    this.now_level = '漲跌:' + (getprice(data.b) - getprice(data.y)).toFixed(2)
    this.now_sell_amont = '現賣量:' + (getprice(data.f) || 0 ) 
    this.now_buy_amont = '現買量:' + (getprice(data.g) || 0)
    this.disc = ('最低手續費用計算:' + getfee(data.b)) || 0
    this.tick = (getick(data.b)) || 0

   
    return msgArray = [ 
                     this.name, 
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
                     this.yd,
                     this.now_qty, 
                     this.all_qty, 
                     this.disc, 
                     this.tick 
                    ]
                     
}

// 取價
function getprice(price) {
    if(typeof price === 'string'){
        if(price.includes("_")){
            let current = price.split("_", 1) ? price.split("_", 1) : 0
            return parseFloat(current)
        }
    }

    //轉為整數
    return price % 1 === 0 ? parseFloat(price) : parseFloat(price);
}

// 手續費
function getfee(price) {
    let fee = getprice(price) * 1000 * 0.2697/100
    return fee.toFixed(2)
}

// 檔位判斷
function getpart(price) {
    return price<10?0.01:(price<50?0.05:(price<100?0.1:(price<500?0.5:(price<1000?1:5))))
}

//輸出標價資訊
function getick(price) {
    price = getprice(price)
    let disc = getfee(price)
    let level = getpart(price)
    let part = Math.ceil(disc/(level*1000))
    let inc_price = price + (part*level)
    return msg = '最少要跳'+part+'檔,'+inc_price.toFixed(2)+'賣出'
    
}

module.exports = data
