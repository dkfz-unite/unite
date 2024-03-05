const routes = [
  {
    path: "/cells/:id/:tab?",
    name: "cell",
    meta: { title: "UNITE.CellLine", authorize: true, tab: "summary" },
    component: () => import(/* webpackChunkName: "cell" */ "../CellPage.vue")
  }
];

export default routes;