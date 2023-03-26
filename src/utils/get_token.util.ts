import { api } from './api';
export = {
   getTokenByAPIKey: async (code: any) => {
      let token = await api.post('/token', { code: code });
      return token;
   },
};
