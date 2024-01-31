const routes = [
  {
    path: '/tissues/:id/:tab?',
    name: 'tissue',
    meta: { title: "UNITE.Material", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "tissue" */ '../TissuePage.vue')
  }
];

export default routes;