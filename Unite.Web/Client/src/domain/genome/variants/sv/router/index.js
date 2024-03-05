const routes = [
  {
    path: '/svs/:id/:tab?',
    name: 'sv',
    meta: { title: "UNITE.SV", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "sv" */ '../SVPage.vue')
  }
];

export default routes;