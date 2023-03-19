const axios = require('axios');
const { parse, stringify } = require('qs');
require('dotenv').config();

const api_key = process.env.API_KEY_CASSO;

const axiosClient = axios.create({
   baseURL: 'https://oauth.casso.vn/v2',
   headers: {
      'content-type': 'application/json',
      Authorization: `Apikey ${api_key}`,
   },
   paramsSerializer: {
      params: stringify,
      arrayFormat: 'brackets',
      parse,
   },
});
axiosClient.interceptors.request.use(async (config) => {
   return config;
});
axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) return response.data;
      return response;
   },
   (error) => {
      throw error;
   }
);
module.exports = axiosClient;
