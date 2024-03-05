import Settings from "../settings";

const routes = [
  {
    path: `/genes/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "gene" */ "../Page.vue")
  }
];

export default routes;