import { defineStore } from 'pinia';
import api from '@/services/api';

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    books: [],
    publishers: [],
    series: [],
  }),
  getters: {

  },
  actions: {
    async getUserBooks(id) {
      try {
        const response = await api.get(`/books/${id}`);
        if (response?.result) {
          this.books = response.result;
        }
        return null;
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
    async addBook(inData) {
      try {
        const response = await api.post('/books', inData);
        if (response?.result && response?.message) {
          window.$message.success(response.message);
          await this.getUserBooks(inData.user_id);
        }
        return null;
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
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
