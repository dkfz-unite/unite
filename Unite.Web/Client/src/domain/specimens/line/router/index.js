import Settings from "../settings";

const routes = [
  {
    path: `/lines/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "cell" */ "../Page.vue")
  }
];

export default routes;