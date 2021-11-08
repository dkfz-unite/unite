const routes = [
  {
    path: '/filters',
    name: "filters",
    meta: { title: "UNITE.Filters", authorize: true },
    component: () => import(/* webpackChunkName: "filters" */ '../FiltersPage.vue')
  }
];

export default routes;