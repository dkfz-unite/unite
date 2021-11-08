const routes = [
  {
    path: '/organoids/:id/:tab?',
    name: 'organoid',
    meta: { title: "UNITE.Organoid", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "organoid" */ '../OrganoidPage.vue')
  }
];

export default routes;