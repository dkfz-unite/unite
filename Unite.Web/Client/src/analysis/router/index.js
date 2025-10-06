import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}/:id?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: "default" },
    component: () => import(/* webpackChunkName: "analysis" */ "../Page.vue")
  }
];

export default routes;