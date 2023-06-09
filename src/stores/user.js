import { defineStore } from 'pinia';
import { useBookStore as bookStore } from '@/stores/book';
import api from '@/services/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    token: localStorage.getItem('user-token') || '',
  }),
  getters: {
    canEdit() {
      return this.user && this.token;
    },
  },
  actions: {
    async loginUser(inData) {
      try {
        const userData = await api.post('/users/login', inData);
        this.user = userData.user;
        this.token = userData.token;
        localStorage.setItem('user-token', userData.token);
        await bookStore().getUserBooks(this.user._id);
      } catch (e) {
        window.$message.error(e.message);
        throw Error(e);
      }
    },
    async regUser(inData) {
      try {
        await api.post('/users/registration', inData);
        await this.loginUser(inData);
      } catch (e) {
        throw Error(e);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user-token');
    },
  },
  persist: true,
});
