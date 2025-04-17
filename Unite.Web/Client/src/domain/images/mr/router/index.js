import Settings from "../settings";

const routes = [
  {
    path: `/mrs/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "mr" */ "../Page.vue")
  }
];

export default routes;