const routes = [
  {
    path: '/mutations',
    name: 'mutations',
    meta: { title: "UNITE.Mutations", authorize: true },
    component: () => import(/* webpackChunkName: "mutations" */ '../MutationsPage.vue')
  }
];

export default routes;