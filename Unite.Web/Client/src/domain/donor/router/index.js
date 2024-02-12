import Settings from "../settings";

const routes = [
  {
    path: `/donors/:id/:tab?`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true, tab: Settings.tabs.summary.domain },
    component: () => import(/* webpackChunkName: "donor" */ "../DonorPage.vue")
  }
];

export default routes;