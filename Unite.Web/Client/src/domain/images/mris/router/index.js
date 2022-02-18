const routes = [
  {
    path: '/mris',
    name: 'mris',
    meta: { title: "UNITE.MRIs", authorize: true },
    component: () => import(/* webpackChunkName: "mris" */ '../MriImagesPage.vue')
  }
];

export default routes;