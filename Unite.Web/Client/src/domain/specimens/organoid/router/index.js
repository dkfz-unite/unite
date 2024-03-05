import Settings from "../settings";

const routes = [
  {
    path: `/organoids/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "organoid" */ '../Page.vue')
  }
];

export default routes;