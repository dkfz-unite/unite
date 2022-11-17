const routes = [
  {
    path: '/cnvs/:id/:tab?',
    name: 'cnv',
    meta: { title: "UNITE.CNV", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "cnv" */ '../CNVPage.vue')
  }
];

export default routes;