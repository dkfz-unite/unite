import Settings from "../settings";

const routes = [
  {
    path: `/materials/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "material" */ "../MaterialPage.vue")
  }
];

export default routes;