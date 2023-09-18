// const message = require('../lib/message')
// const fstock = require('../lib/stock')

const line = require('@line/bot-sdk')
// line channel設定
const clientConfig = {
  channelAccessToken: process.env.CHANNEL_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}
const client = new line.Client(clientConfig)

const handler = async (event) => {

  const body = event.body

  try {
      // JSON格式轉換物件
      const objBody = JSON.parse(body);
      // 觸發事件轉linebot處理
      await Promise.all(objBody.events.map(botEvent))

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


const botEvent = async (event) => {
    
  //只接收訊息格式
  if (event.type !== 'message') {
      return Promise.resolve(null)
  }

  const { type } = event.message
  switch (type) {
    case 'text':
      const { text } = event.message
      const res = {
          type: 'text',
          text: `我收到的訊息是.... ${text}`,
      }
      break
    case 'sticker':
      const res = {
        "type": "sticker",
        "packageId": "1",
        "stickerId": "1"
      }
      break
    case 'image':
      const res = {
        "type": "image",
        "originalContentUrl": "圖片網址",
        "previewImageUrl": "縮圖網址"
      }
      break
    case 'video':
      
      break
    case 'audio':
      const res = {
        "type": "audio",
        "originalContentUrl": "聲音檔網址",
        "duration": 60000
      }
      break
    case 'location':
      const res = {
        "type": "location",
        "title": "第一行文字",
        "address": "第二行文字",
        "latitude": 35.65910807942215,
        "longitude": 139.70372892916203
      }
      break
    case 'imagemap':
      const res = {
        type: 'text',
        text: `還沒實作這個格式`,
      }
      break
    case 'template':
      const res = {
        type: 'text',
        text: `還沒實作這個格式`,
      }
      break
    default:
      const res = {
        type: 'text',
        text: `我收到的格式是.... ${type}`,
      }
      break
  }

  const { replyToken } = event
  const response = res
  // const response = {
  //         type: 'text',
  //         text: `我收到的格式是.... ${type}`,
  //       }

  await client.replyMessage(replyToken, response)
}


//主程式輸出
module.exports = { handler }
