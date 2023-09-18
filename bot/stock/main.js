const message = require('../lib/message')
const fstock = require('../lib/stock')

const handler = async (event) => {

  const body = event.body

  try {
      // JSON格式轉換物件
      const objBody = JSON.parse(body);
      // 觸發事件轉linebot處理
      await Promise.all(objBody.events.map(message))

      //無觸發的預設返回訊息
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "聽嘸哩共蝦咪..." }),
      }
  } catch (error) {
        console.log(error)
        return { statusCode: 500, body: error.toString() }
  }

}

//主程式輸出
module.exports = { handler }
