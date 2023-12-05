// Reads the text from a specified domain's /ads.txt endpoint
const axios = require('axios');
const AppError = require('./AppError');

const constructUrl = (domain) => {
  const endpoint = '/ads.txt';
  return `https://www.${domain}${endpoint}`;
};

const fetchText = async (domain) => {
  const url = constructUrl(domain);
  const response = await axios.get(url);
  return response.data;
};

module.exports = fetchText;
