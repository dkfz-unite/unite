const routes = [
  {
    path: '/mris/:id/:tab?',
    name: 'mri',
    meta: { title: "UNITE.MRI", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "mri" */ '../MriImagePage.vue')
  }
];

export default routes;