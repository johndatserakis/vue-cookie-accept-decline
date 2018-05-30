require('./index.html')

import Vue from 'vue'
import App from './App.vue'

console.log('here')

import VueCookieAcceptDecline from '../src/index.js'
Vue.component('vue-cookie-accept-decline', VueCookieAcceptDecline)

new Vue({
  el: '#app',
  render: h => h(App)
})
