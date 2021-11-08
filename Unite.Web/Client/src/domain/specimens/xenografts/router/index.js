const routes = [
  {
    path: '/xenografts',
    name: 'xenografts',
    meta: { title: "UNITE.Xenografts", authorize: true },
    component: () => import(/* webpackChunkName: "xenografts" */ '../XenograftsPage.vue')
  }
];

export default routes;