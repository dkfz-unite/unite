const routes = [
  {
    path: '/cnvs',
    name: 'cnvs',
    meta: { title: "UNITE.CNVs", authorize: true },
    component: () => import(/* webpackChunkName: "cnvs" */ '../CNVsPage.vue')
  }
];

export default routes;