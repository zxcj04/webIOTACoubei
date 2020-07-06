import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue';
import Header from '../components/Header.vue';
import Home from '../components/Home.vue';
import UserInfo from '../components/UserInfo.vue';
import Pay from '../components/Pay.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login
  },

  {
    path: '/',
    components: {
      default: Home,
      nav: Header
    }
  },

  {
    path: '/userInfo',
    components: {
      default: UserInfo,
      nav: Header
    }
  },

  {
    path: '/pay',
    components: {
      default: Pay,
      nav: Header
    }
  },

  {
    path: '*',
    redirect: '/',
  },
];

export const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') == 'ImLogin' ;  // TODO

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