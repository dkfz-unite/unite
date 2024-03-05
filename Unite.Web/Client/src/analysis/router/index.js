const routes = [
  {
    path: "/analysis",
    name: "analysis",
    meta: { title: "UNITE.Analysis", authorize: true },
    component: () => import(/* webpackChunkName: "analysis" */ "../AnalysisPage.vue")
  }
];

export default routes;