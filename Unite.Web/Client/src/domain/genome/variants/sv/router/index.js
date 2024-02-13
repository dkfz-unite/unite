import Settings from "../settings";

const routes = [
  {
    path: `/svs/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "sv" */ "../SVPage.vue")
  }
];

export default routes;