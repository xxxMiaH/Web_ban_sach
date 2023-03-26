import { api } from './api';
export = {
   create: async (data: any) => {
      let res = await api.post('/webhooks', data);
      return res;
   },
   getDetailWebhookById: async (webhookId: any) => {
      let res = await api.get(`/webhooks/${webhookId}`);
      return res;
   },
   updateWebhookById: async (webhookId: any, data: any) => {
      let res = await api.put(`/webhooks/${webhookId}`, data);
      return res;
   },
   deleteWebhookById: async (webhookId: any) => {
      let res = await api.delete(`/webhooks/${webhookId}`);
      return res;
   },
   deleteWebhookByUrl: async (urlWebhook: any) => {
      // Thêm url vào query để delete https://oauth.casso.vn/v1/webhooks?webhook=https://website-cua-ban.com/api/webhook
      let query = { params: { webhook: urlWebhook } };
      let res = await api.delete(`/webhooks`, query);
      return res;
   },
   parseOrderId: (
      caseInsensitive: boolean,
      transactionPrefix: string,
      description: string
   ) => {
      const indexEBOOK = description.indexOf('EBOOK');
      const captcha = description.substring(indexEBOOK + 5, indexEBOOK + 11);
      return captcha;
   },
};
