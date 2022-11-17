const routes = [
  {
    path: '/ssms/:id/:tab?',
    name: 'ssm',
    meta: { title: "UNITE.SSM", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "ssm" */ '../SSMPage.vue')
  }
];

export default routes;