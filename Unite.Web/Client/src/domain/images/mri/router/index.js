import Settings from "../settings";

const routes = [
  {
    path: `/mris/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "mri" */ "../Page.vue")
  }
];

export default routes;