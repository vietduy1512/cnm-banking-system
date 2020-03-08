import Vue from 'vue'
import Router from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueCookies from 'vue-cookies';

import About from './views/About.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Transfer from './views/Transfer.vue'
import Contacts from './views/Contacts.vue'
//import Confirmation from './views/Confirmation.vue'
import TransactionHistory from './views/TransactionHistory.vue'
import ShutdownAccount from './views/ShutdownAccount.vue'
import NotFound from './components/NotFound.vue'

import AdminLogin from './admin/AdminLogin.vue'
import AdminDashboard from './admin/AdminDashboard.vue'
import CreateUser from './admin/CreateUser.vue'
import CreateAccount from './admin/CreateAccount.vue'
import AddBalance from './admin/AddBalance.vue'

axios.defaults.withCredentials = true;

Vue.use(Router)
Vue.use(VueCookies);
Vue.use(VueAxios, axios);

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer
    },
    // {
    //   path: '/confirmation',
    //   name: 'confirmation',
    //   component: Confirmation
    // },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionHistory
    },
    {
      path: '/shutdownAccount',
      name: 'ShutdownAccount',
      component: ShutdownAccount
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/createUser',
      name: 'CreateUser',
      component: CreateUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/createAccount',
      name: 'CreateAccount',
      component: CreateAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin/addBalance',
      name: 'AddBalance',
      component: AddBalance,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
})

// Intercept every request
const UNAUTHORIZED = 401;
axios.interceptors.response.use(
  response => response,
  error => {
    window.$cookies.set("isAuthenticated", false);
    if (error.response.status === UNAUTHORIZED) {
      alert(error.response.data.msg);
      router.push('login');
    }
    // TODO: refresh cookies
    return Promise.reject(error);
  }
);

// Middleware to redirect user if not login
router.beforeEach((to, from, next) => {
  var r = to.matched.some(record => record.meta.requiresAuth);
  if (r === true) {
    var isAuthenticated = window.$cookies.get("isAuthenticated");
    if (isAuthenticated === 'false') {
      next({
        path: '/login',
      })
    } else next();
  } else next();
})

export default router;