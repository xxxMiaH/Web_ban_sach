import { api } from './api';
export = {
   getTransactions: async (params: any, accessToken: string) => {
      api.defaults.headers.Authorization = accessToken;
      let res = await api.get('/transactions', { params });
      return res;
   },
   getDetailTransaction: async (transactionId: any, accessToken: string) => {
      api.defaults.headers.Authorization = accessToken;
      let res = await api.get(`/transactions/${transactionId}`);
      return res;
   },
};
