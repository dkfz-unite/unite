const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "donors" },
    meta: { title: "UNITE", authorize: false },
    // component: () => import(/* webpackChunkName: "index" */ "../views/Index.vue")
  }
];

export default routes;