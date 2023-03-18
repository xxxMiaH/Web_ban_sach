const api = require('./api');
module.exports = {
   getDetailUser: async () => {
      let res = await api.get(`/userInfo`);
      return res;
   },
};
