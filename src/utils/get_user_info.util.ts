import { api } from'./api';
export = {
   getDetailUser: async () => {
      let res = await api.get(`/userInfo`);
      return res;
   },
};
