const routes = [
  {
    path: '/organoids',
    name: 'organoids',
    meta: { title: "UNITE.Organoids", authorize: true },
    component: () => import(/* webpackChunkName: "organoids" */ '../OrganoidsPage.vue')
  }
];

export default routes;