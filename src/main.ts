import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './plugins/chart';
import '@mdi/font/css/materialdesignicons.css';
import './assets/styles/main.scss';

createApp(App).use(router).use(vuetify).mount('#app');
