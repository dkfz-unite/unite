import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'donors' },
    name: 'home',
    meta: { title: "UNITE.Unite" },
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/donors',
    name: 'donors',
    meta: { title: "UNITE.Donors" },
    component: () => import(/* webpackChunkName: "donors" */ '../views/Donors.vue')
  },
  {
    path: '/donor/:id',
    name: 'donor',
    meta: { title: "UNITE.Donor" },
    component: () => import(/* webpackChunkName: "donor" */ '../views/Donor.vue')
  },
  {
    path: '/mutations',
    name: 'mutations',
    meta: { title: "UNITE.Mutations" },
    component: () => import(/* webpackChunkName: "mutations" */ '../views/Mutations.vue')
  },
  {
    path: '/mutation/:id',
    name: 'mutation',
    meta: { title: "UNITE.Mutation" },
    component: () => import(/* webpackChunkName: "mutation" */ '../views/Mutation.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})

export default router
