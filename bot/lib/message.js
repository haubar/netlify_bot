const line = require('@line/bot-sdk')
const stock = require('./stock')


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
      let text = event.message.text
      console.log('📨 收到搜尋: ' + text)
      
      let stockid = await getKeyword(text)
      console.log('🔍 轉換後的股票ID: ' + stockid)
      
      text = await stock.findstock(stockid)
      console.log('📊 搜尋結果:', text)
      
      if(Array.isArray(text)) {
          text = text.join("\n") 
      }

      res = {
          type: 'text',
          text: `${text}`,
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


async function getKeyword(keyword) {
  try {
      //解析關鍵字
      let text = keyword.trim()
      console.log('🏷️ 原始關鍵字:', text)
      
      // 零值加權驗證
      let zero_reg = new RegExp("^[0]+$")
      if (zero_reg.test(text) ) {
          return 0
      }
      //非英數字
      let reg = new RegExp("^[a-zA-Z0-9]+$")
      if (!reg.test(text) ) {
          const code = await stock.getstockcode(text)
          console.log('💬 中文轉股票代碼:', code)
          return code || 0
      }
      return text
  } catch (error) {
      console.error('❌ 錯誤:', error.message)
      return error.toString()
  }
}



module.exports = {botEvent}