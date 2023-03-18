const api = require('./api');
module.exports = {
   create: async (data) => {
      let res = await api.post('/webhooks', data);
      return res;
   },
   getDetailWebhookById: async (webhookId) => {
      let res = await api.get(`/webhooks/${webhookId}`);
      return res;
   },
   updateWebhookById: async (webhookId, data) => {
      let res = await api.put(`/webhooks/${webhookId}`, data);
      return res;
   },
   deleteWebhookById: async (webhookId) => {
      let res = await api.delete(`/webhooks/${webhookId}`);
      return res;
   },
   deleteWebhookByUrl: async (urlWebhook) => {
      // Thêm url vào query để delete https://oauth.casso.vn/v1/webhooks?webhook=https://website-cua-ban.com/api/webhook
      let query = { params: { webhook: urlWebhook } };
      let res = await api.delete(`/webhooks`, query);
      return res;
   },
   parseOrderId: (caseInsensitive, transactionPrefix, description) => {
      const captcha = description.split(' ').find((item) => {
         if (item.indexOf('EBOOK') !== -1) {
            return item;
         }
      });
      // Ở đây mình ở sử dụng regex để parse nội dung chuyển khoản có chứa orderId
      if (!captcha) return null;
      let re = new RegExp(transactionPrefix);
      if (!caseInsensitive) re = new RegExp(transactionPrefix, 'i');
      let matchPrefix = captcha.match(re);
      // Không tồn tại tiền tố giao dịch
      if (!matchPrefix) return null;
      let orderId = parseInt(
         captcha.substring(transactionPrefix.length, captcha.length)
      );
      return orderId;
   },
};
