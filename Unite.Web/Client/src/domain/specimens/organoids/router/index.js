import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true },
    component: () => import(/* webpackChunkName: "organoids" */ '../OrganoidsPage.vue')
  }
];

export default routes;