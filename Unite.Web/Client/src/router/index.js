import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'donors',
    name: 'home',
    meta: { title: "UNITE.Unite", authorize: true },
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/donors',
    name: 'donors',
    meta: { title: "UNITE.Donors", authorize: true },
    component: () => import(/* webpackChunkName: "donors" */ '../views/Donors.vue')
  },
  {
    path: '/donor/:id',
    name: 'donor',
    meta: { title: "UNITE.Donor", authorize: true },
    component: () => import(/* webpackChunkName: "donor" */ '../views/Donor.vue')
  },
  {
    path: '/mutations',
    name: 'mutations',
    meta: { title: "UNITE.Mutations", authorize: true },
    component: () => import(/* webpackChunkName: "mutations" */ '../views/Mutations.vue')
  },
  {
    path: '/mutation/:id',
    name: 'mutation',
    meta: { title: "UNITE.Mutation", authorize: true },
    component: () => import(/* webpackChunkName: "mutation" */ '../views/Mutation.vue')
  },

  {
    path: '/login',
    name: "login",
    meta: { title: "Unite.Login", anonymous: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/identity/Login.vue')
  },
  {
    path: '/register',
    name: "register",
    meta: { title: "Unite.Register", anonymous: true },
    component: () => import(/* webpackChunkName: "register" */ '../views/identity/Register.vue')
  },
  {
    path: '/account',
    name: "account",
    meta: { title: "Unite.Account", authorize: true },
    component: () => import(/* webpackChunkName: "account" */ '../views/identity/Account.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.authorize) {
    if (!store.state.account) {
      next({ name: "login" });
    }
  } else if (to.meta?.anonymous) {
    if (!!store.state.account) {
      next({ name: "account" });
    }
  } else {

  }

  document.title = to.meta.title;
  next();  
})

export default router
