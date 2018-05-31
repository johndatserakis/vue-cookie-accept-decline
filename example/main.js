import Vue from 'vue'
import App from './App.vue'

import VueCookieAcceptDecline from '../src/index.js'
Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)

new Vue({
  el: '#app',
  render: h => h(App)
})
