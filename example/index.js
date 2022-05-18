import { createApp } from 'vue';
import VueCookieAcceptDecline from '../src/index.js';
import App from './App.vue';

const app = createApp(App);

app.component('vue-cookie-accept-decline', VueCookieAcceptDecline);

app.mount('#app');
