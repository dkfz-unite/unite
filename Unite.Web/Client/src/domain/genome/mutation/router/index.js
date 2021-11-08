const routes = [
  {
    path: '/mutations/:id/:tab?',
    name: 'mutation',
    meta: { title: "UNITE.Mutation", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "mutation" */ '../MutationPage.vue')
  }
];

export default routes;