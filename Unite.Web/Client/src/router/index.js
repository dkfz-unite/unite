import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'donors',
    name: 'home',
    // meta: { title: "UNITE.Unite", authorize: true },
    // component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/donors',
    name: 'donors',
    meta: { title: "UNITE.Donors", authorize: true },
    component: () => import(/* webpackChunkName: "donors" */ '../views/data/donors/Donors.vue')
  },
  {
    path: '/donors/:id',
    name: 'donor',
    meta: { title: "UNITE.Donor", authorize: true },
    component: () => import(/* webpackChunkName: "donor" */ '../views/data/donors/Donor.vue')
  },
  {
    path: '/tissues',
    name: 'tissues',
    meta: { title: "UNITE.Tissues", authorize: true },
    component: () => import(/* webpackChunkName: "tissues" */ '../views/data/specimens/Tissues.vue')
  },
  {
    path: '/tissues/:id',
    name: 'tissue',
    meta: { title: "UNITE.Tissue", authorize: true },
    component: () => import(/* webpackChunkName: "tissue" */ '../views/data/specimens/Tissue.vue')
  },
  {
    path: '/cells',
    name: 'cells',
    meta: { title: "UNITE.CellLines", authorize: true },
    component: () => import(/* webpackChunkName: "cells" */ '../views/data/specimens/Cells.vue')
  },
  {
    path: '/cells/:id',
    name: 'cell',
    meta: { title: "UNITE.CellLine", authorize: true },
    component: () => import(/* webpackChunkName: "cell" */ '../views/data/specimens/Cell.vue')
  },
  {
    path: '/organoids',
    name: 'organoids',
    meta: { title: "UNITE.Organoids", authorize: true },
    component: () => import(/* webpackChunkName: "organoids" */ '../views/data/specimens/Organoids.vue')
  },
  {
    path: '/organoids/:id',
    name: 'organoid',
    meta: { title: "UNITE.Organoid", authorize: true },
    component: () => import(/* webpackChunkName: "organoid" */ '../views/data/specimens/Organoid.vue')
  },
  {
    path: '/xenografts',
    name: 'xenografts',
    meta: { title: "UNITE.Xenografts", authorize: true },
    component: () => import(/* webpackChunkName: "xenografts" */ '../views/data/specimens/Xenografts.vue')
  },
  {
    path: '/xenografts/:id',
    name: 'xenograft',
    meta: { title: "UNITE.Xenograft", authorize: true },
    component: () => import(/* webpackChunkName: "xenograft" */ '../views/data/specimens/Xenograft.vue')
  },
  {
    path: '/genes',
    name: 'genes',
    meta: { title: "UNITE.Genes", authorize: true },
    component: () => import(/* webpackChunkName: "genes" */ '../views/data/genes/Genes.vue')
  },
  {
    path: '/genes/:id',
    name: 'gene',
    meta: { title: "UNITE.Gene", authorize: true },
    component: () => import(/* webpackChunkName: "gene" */ '../views/data/genes/Gene.vue')
  },
  {
    path: '/mutations',
    name: 'mutations',
    meta: { title: "UNITE.Mutations", authorize: true },
    component: () => import(/* webpackChunkName: "mutations" */ '../views/data/mutations/Mutations.vue')
  },
  {
    path: '/mutations/:id',
    name: 'mutation',
    meta: { title: "UNITE.Mutation", authorize: true },
    component: () => import(/* webpackChunkName: "mutation" */ '../views/data/mutations/Mutation.vue')
  },

  {
    path: '/oncogrid',
    name: "oncogrid",
    meta: { title: "UNITE.OncoGrid", authorize: true },
    component: () => import(/* webpackChunkName: "oncogrid" */ '../views/visualization/OncoGrid.vue'),
    props: true
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
  routes: routes
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
