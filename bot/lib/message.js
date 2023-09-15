const handler = async (event) => {
  try {
    const keyword = event.keyword || ""
    // 訊息前綴格式判斷

    // 訊息內容分離
    return keyword
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
