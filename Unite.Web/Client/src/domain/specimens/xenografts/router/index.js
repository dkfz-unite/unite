import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: "UNITE.Xenografts", authorize: true },
    component: () => import(/* webpackChunkName: "xenografts" */ '../XenograftsPage.vue')
  }
];

export default routes;