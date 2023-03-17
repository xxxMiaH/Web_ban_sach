// api/axiosClient.js
const axios = require('axios');
const qs = require('qs');
const axiosClient = axios.create({
   baseURL: 'https://oauth.casso.vn/v1',
   headers: {
      'content-type': 'application/json',
   },
   paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
   },
});

axiosClient.interceptors.request.use(async (config) => {
   return config;
});

axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      // Handle errors
      throw error;
   }
);

module.exports = axiosClient;
