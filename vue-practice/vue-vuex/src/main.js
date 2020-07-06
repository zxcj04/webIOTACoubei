import Vue from 'vue'
import App from './App.vue'
import { store } from './store/index.js'
import { router } from './routers/routes.js'

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
