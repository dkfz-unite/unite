const routes = [
  {
    path: '/donors/:id/:tab?',
    name: 'donor',
    meta: { title: "UNITE.Donor", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "donor" */ '../DonorPage.vue')
  }
];

export default routes;