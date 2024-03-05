const routes = [
  {
    path: '/genes/:id/:tab?',
    name: 'gene',
    meta: { title: "UNITE.Gene", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "gene" */ '../GenePage.vue')
  }
];

export default routes;