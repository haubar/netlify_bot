const line = require('@line/bot-sdk')
const fetch = require("node-fetch")


const handler = async (event) => {

const clientConfig = {
	channelAccessToken: process.env.CHANNEL_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET
  } 

const client = new line.Client(clientConfig)

const signature = event.headers['x-line-signature'];
const body = event.body;


//line邏輯處理
const botEvent = async (event, context) => {
	if (event.type !== 'message' || event.message.type !== 'text') {
      		return Promise.resolve(null)
    	}
	
	const { text } = event.message
	const { replyToken } = event
	const response = {
		type: 'text',
		text: `我還沒空支援這個格式...${text}`,
	}
	await client.replyMessage(replyToken, response)
}

try {

    // 將 JSON 轉為 JavaScript 物件
    const objBody = JSON.parse(body);
    // 將觸發事件交給 Line Bot 做處理
    await Promise.all(objBody.events.map(botEvent))

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "聽嘸哩共蝦咪..." }),
    }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }

}



//輸出
module.exports = { handler }
