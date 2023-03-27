import { api } from './api';
export = {
   syncTransaction: async (bankNumber: number) => {
      let res = await api.post('/sync', { bank_acc_id: bankNumber });
      return res;
   },
};
