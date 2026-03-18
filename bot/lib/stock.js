'use strict';

const axios = require('axios');

async function getinfo(symbol) {
    try {
        const response = await axios.get(`https://api.example.com/stocks/${symbol}`);

        // Log the raw API response
        console.log('Raw API Response:', response);

        // Parse the JSON object
        const data = response.data;
        console.log('Parsed JSON Object (first 500 chars):', JSON.stringify(data).substring(0, 500));

        // Extract stock information
        const stockInfo = {
            symbol: data.symbol,
            price: data.price,
            volume: data.volume,
        };
        console.log('Extracted Stock Info (first 300 chars):', JSON.stringify(stockInfo).substring(0, 300));

        return stockInfo;
    } catch (error) {
        console.error('Error fetching stock information:', error);
        throw error;
    }
}

module.exports = { getinfo };
