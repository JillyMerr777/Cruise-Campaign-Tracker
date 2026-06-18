import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/chart';
import './assets/styles/tailwind.css';
import './assets/styles/main.scss';

createApp(App).use(router).mount('#app');
