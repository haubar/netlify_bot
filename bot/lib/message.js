const line = require('@line/bot-sdk')

// line channel設定
const clientConfig = {
    channelAccessToken: process.env.CHANNEL_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}
const client = new line.Client(clientConfig)

//line動作、邏輯判斷
const botEvent = async (event, context) => {
    
  //只接收訊息格式
  if (event.type !== 'message') {
      return Promise.resolve(null)
  }

  switch (event.message.type) {
    case 'text':
      const { text } = event.message
      const res = {
          type: 'text',
          text: `我收到的訊息是.... ${text}`
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
        text: `還沒實作這個格式`
      }
      break
    case 'template':
      const res = {
        type: 'text',
        text: `還沒實作這個格式`
      }
      break
    default:
      break
  }

  const { replyToken } = event
  const response = res
  
  await client.replyMessage(replyToken, response)
}


const getKeyword = async (event) => {
  try {
    //解析關鍵字
    const keyword = event.keyword.trim() || ""
    if(!isNaN(keyword)) {
      return 0
      // return getstock(keyword) || 0
    }
    return keyword
  } catch (error) {
    return 0
  }
}


module.exports = {botEvent}
