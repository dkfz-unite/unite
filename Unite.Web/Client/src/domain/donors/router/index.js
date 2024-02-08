import Settings from "../settings";

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: "UNITE.Donors", authorize: true },
    component: () => import(/* webpackChunkName: "donors" */ "../DonorsPage.vue")
  }
];

export default routes;