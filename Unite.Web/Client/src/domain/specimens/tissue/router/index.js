import Settings from "../settings";

const routes = [
  {
    path: `/tissues/:id/:tab?`,
    name: "tissue", //Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "material" */ "../MaterialPage.vue")
  }
];

export default routes;