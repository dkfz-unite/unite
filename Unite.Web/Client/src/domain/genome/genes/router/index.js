const routes = [
  {
    path: '/genes',
    name: 'genes',
    meta: { title: "UNITE.Genes", authorize: true },
    component: () => import(/* webpackChunkName: "genes" */ '../GenesPage.vue')
  }
];

export default routes;