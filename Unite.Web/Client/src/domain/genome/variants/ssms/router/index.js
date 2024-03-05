const routes = [
  {
    path: '/ssms',
    name: 'ssms',
    meta: { title: "UNITE.SSMs", authorize: true },
    component: () => import(/* webpackChunkName: "ssms" */ '../SSMsPage.vue')
  }
];

export default routes;