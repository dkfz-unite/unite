const routes = [
  {
    path: '/xenografts/:id/:tab?',
    name: 'xenograft',
    meta: { title: "UNITE.Xenograft", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "xenograft" */ '../XenograftPage.vue')
  }
];

export default routes;