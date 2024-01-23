const routes = [
    {
      path: "/projects",
      name: "projects",
      meta: { title: "UNITE.Projects", authorize: true },
      component: () => import(/* webpackChunkName: "projects" */ "../ProjectsPage.vue")
    }
  ];

export default routes;