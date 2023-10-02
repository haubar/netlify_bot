const line = require('@line/bot-sdk')
const stock = require('stock')

// line channel設定
const clientConfig = {
    channelAccessToken: process.env.CHANNEL_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}
const client = new line.Client(clientConfig)

//line動作、邏輯判斷
const botEvent = async (event) => {
    
  //只接收訊息格式
  if (event.type !== 'message') {
      return Promise.resolve(null)
  }

  const { type } = event.message
  let res = {}
  switch (type) {
    case 'text':
      let text = getKeyword(event.message.text)
      // let { text } = (event.message)
      res = {
          type: 'text',
          text: `我收到的訊息是.... ${text}`,
      }
      break
    case 'sticker':
      res = {
        "type": "sticker",
        "packageId": "1",
        "stickerId": "1"
      }
      break
    case 'image':
      res = {
        "type": "image",
        "originalContentUrl": "圖片網址",
        "previewImageUrl": "縮圖網址"
      }
      break
    case 'video':
      
      break
    case 'audio':
      res = {
        "type": "audio",
        "originalContentUrl": "聲音檔網址",
        "duration": 60000
      }
      break
    case 'location':
      res = {
        "type": "location",
        "title": "第一行文字",
        "address": "第二行文字",
        "latitude": 35.65910807942215,
        "longitude": 139.70372892916203
      }
      break
    case 'imagemap':
      res = {
        type: 'text',
        text: `還沒實作這個格式`,
      }
      break
    case 'template':
      res = {
        type: 'text',
        text: `還沒實作這個格式`,
      }
      break
    default:
      res = {
        type: 'text',
        text: `我收到的格式是.... ${type}`,
      }
      break
  }

  const { replyToken } = event
  const response = res

  await client.replyMessage(replyToken, response)
}


function getKeyword(keyword) {
  try {
      //解析關鍵字
      let text = keyword.trim()
      //非數字
      if(!!isNaN(text)) {
          return await stock.getstock(text) || 0
      }
      return text
  } catch (error) {
      return error.toString()
  }
}




module.exports = {botEvent}
