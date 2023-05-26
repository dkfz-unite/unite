const routes = [
  {
    path: '/mris',
    name: 'mris',
    meta: { title: "UNITE.MRIs", authorize: true },
    component: () => import(/* webpackChunkName: "mris" */ '../MRIsPage.vue')
  }
];

export default routes;