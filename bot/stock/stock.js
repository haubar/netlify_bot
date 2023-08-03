const line = require('@line/bot-sdk')
const fetch = require("node-fetch")

const clientConfig = {
	channelAccessToken: process.env.CHANNEL_TOKEN,
	channelSecret: process.env.CHANNEL_SECRET
  } 

const client = new line.Client(clientConfig);

const handler = async (event, context) => {

	//驗證格式
	const { replyToken } = event;
	const response = {
		type: 'text',
		text: `我還沒空支援這個格式...test`,
	}
	await client.replyMessage(replyToken, response)

}

//輸出
module.exports = { handler }
