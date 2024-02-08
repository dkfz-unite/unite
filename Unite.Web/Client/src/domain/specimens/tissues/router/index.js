import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: "UNITE.Materials", authorize: true },
    component: () => import(/* webpackChunkName: "materials" */ "../TissuesPage.vue")
  }
];

export default routes;