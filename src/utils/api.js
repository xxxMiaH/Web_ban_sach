const axios = require('axios');
const { parse, stringify } = require('qs');

const axiosClient = axios.create({
   baseURL: 'https://oauth.casso.vn/v2',
   headers: {
      'content-type': 'application/json',
      Authorization: `Apikey AK_CS.2383a6e0c47d11ed8f2f9f7a85b1d621.24scfeiDEZSENqIrBs2sGlmsSAl8tbLHZuZ2tnj1svxX7iSCBROeNlqCjjzNxVbLmSK4cmxg`,
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
