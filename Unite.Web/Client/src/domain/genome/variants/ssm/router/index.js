import Settings from "../settings";

const routes = [
  {
    path: `/ssms/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "ssm" */ "../Page.vue")
  }
];

export default routes;