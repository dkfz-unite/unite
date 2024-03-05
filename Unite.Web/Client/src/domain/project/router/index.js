const routes = [
  {
    path: '/projects/:id',
    name: 'project',
    meta: { title: "UNITE.Project", authorize: true },
    component: () => import(/* webpackChunkName: "project" */ '../ProjectPage.vue')
  }
];

export default routes;
