import Settings from "../settings";

const routes = [
  {
    path: `/sms/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "sm" */ "../Page.vue")
  }
];

export default routes;