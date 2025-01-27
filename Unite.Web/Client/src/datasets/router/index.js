import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}/:domain?/:id?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true },
    component: () => import(/* webpackChunkName: "filters" */ "../Page.vue")
  }
];

export default routes;