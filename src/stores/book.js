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
          return response.result;
        }
        return null;
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
    async getPublishers() {
      try {
        const response = await api.get('/pubs');
        if (response?.result) {
          this.publishers = response.result;
        }
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
    async addSeries(inData) {
      try {
        const response = await api.post('/series', inData);
        if (response?.result && response?.message) {
          window.$message.success(response.message);
          return response.result;
        }
        return null;
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
    async getSeriesByPublisher(id) {
      try {
        const response = await api.get(`/series/${id}`);
        if (response?.result) {
          this.series = response.result;
        }
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
  },
});
