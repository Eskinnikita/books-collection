import { createApp } from 'vue';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

import 'vfonts/Lato.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(naive).use(router)
  .mount('#app');
