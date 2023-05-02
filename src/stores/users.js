import { defineStore } from 'pinia';
import apiService from '@/services/apiService';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    token: localStorage.getItem('user-token') || '',
  }),
  actions: {
    async loginUser(loginModalData) {
      try {
        const userData = await apiService.post('/auth/login', loginModalData);
        this.user = userData.data.user;
        console.log(userData.data.user);
        localStorage.setItem('user-token', userData.data.token);
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

export default useUserStore;
