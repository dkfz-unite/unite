import Settings from "../settings";

const routes = [
  {
    path: `/projects/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "project" */ "../Page.vue")
  }
];

export default routes;