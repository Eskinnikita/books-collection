import { defineStore } from 'pinia';
import api from '@/services/api';

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    publishers: [],
    series: [],
  }),
  getters: {
  },
  actions: {
    async addPublisher(inData) {
      try {
        const response = await api.post('/pubs', inData);
        if (response?.result && response?.message) {
          window.$message.success(response.message);
        }
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
  },
});
