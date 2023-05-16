const routes = [
  {
    path: '/cohorts',
    name: "cohorts",
    meta: { title: "UNITE.Cohorts", authorize: true },
    component: () => import(/* webpackChunkName: "filters" */ '../CohortsPage.vue')
  }
];

export default routes;