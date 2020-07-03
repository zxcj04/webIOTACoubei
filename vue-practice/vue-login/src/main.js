import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routers/routes.js'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') == 'ImLogin' ;

  if( isLogin ) {
    next();
  }
  else {
    if( to.path !== '/login')
      next('/login');
    else
      next();
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
