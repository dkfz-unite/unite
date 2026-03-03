import Settings from "../settings";

const routes = [
  {
    path: `/proteins/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "protein" */ "../Page.vue")
  }
];

export default routes;