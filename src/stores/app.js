import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    isLogModalShown: false,
  }),
  actions: {
    toggleLoginModal(value) {
      this.isLogModalShown = value;
    },
  },
});
