const routes = [
  {
    path: "/donors",
    name: "donors",
    meta: { title: "UNITE.Donors", authorize: true },
    component: () => import(/* webpackChunkName: "donors" */ "../DonorsPage.vue")
  }
];

export default routes;