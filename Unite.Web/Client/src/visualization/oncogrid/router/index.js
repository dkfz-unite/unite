const routes = [
  {
    path: '/oncogrid/:mode?',
    name: "oncogrid",
    meta: { title: "UNITE.OncoGrid", authorize: true },
    component: () => import(/* webpackChunkName: "oncogrid" */ '../OncoGridPage.vue')
  }
];

export default routes;