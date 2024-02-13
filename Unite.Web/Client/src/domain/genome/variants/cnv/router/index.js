import Settings from "../settings";

const routes = [
  {
    path: `/cnvs/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "cnv" */ "../CNVPage.vue")
  }
];

export default routes;