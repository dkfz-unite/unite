const routes = [
  {
    path: '/svs',
    name: 'svs',
    meta: { title: "UNITE.SVs", authorize: true },
    component: () => import(/* webpackChunkName: "svs" */ '../SVsPage.vue')
  }
];

export default routes;