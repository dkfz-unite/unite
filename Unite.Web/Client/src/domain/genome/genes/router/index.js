import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true },
    component: () => import(/* webpackChunkName: "genes" */ "../Page.vue")
  }
];

export default routes;