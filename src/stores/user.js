import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    token: localStorage.getItem('user-token') || '',
  }),
  actions: {
    async loginUser(inData) {
      try {
        const userData = await api.post('/users/login', inData);
        console.log('user', userData);
        this.user = userData.user;
        this.token = userData.token;
        localStorage.setItem('user-token', userData.token);
      } catch (e) {
        console.log(e);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user-token');
    },
  },
  persist: true,
});
