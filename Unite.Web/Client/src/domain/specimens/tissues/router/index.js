const routes = [
  {
    path: '/tissues',
    name: 'tissues',
    meta: { title: "UNITE.Tissues", authorize: true },
    component: () => import(/* webpackChunkName: "tissues" */ '../TissuesPage.vue')
  }
];

export default routes;