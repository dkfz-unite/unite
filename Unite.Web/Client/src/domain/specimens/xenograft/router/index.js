import Settings from "../settings";

const routes = [
  {
    path: `/xenografts/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "xenograft" */ "../XenograftPage.vue")
  }
];

export default routes;