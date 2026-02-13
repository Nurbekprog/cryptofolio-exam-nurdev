const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export const CoinGeckoService = {
  getCoinList: (currency) =>
    `https://api.coingecko.com/api/v3/coins/list?include_platform=false`,

  getSingleCoin: (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`,

  getHistoricalChart: (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,

  getTrendingCoins: (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
    
  getCoinsMarket: (currency, page = 1) => 
     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
};

