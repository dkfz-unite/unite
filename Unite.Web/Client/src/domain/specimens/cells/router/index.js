import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: "UNITE.Lines", authorize: true },
    component: () => import(/* webpackChunkName: "lines" */ "../CellsPage.vue")
  }
];

export default routes;