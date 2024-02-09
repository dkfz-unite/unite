import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}/:domain?/:key?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true },
    component: () => import(/* webpackChunkName: "filters" */ "../CohortsPage.vue")
  }
];

export default routes;