import Settings from "../settings";

const routes = [
  {
    path: `/lines/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "cell" */ "../LinePage.vue")
  }
];

export default routes;