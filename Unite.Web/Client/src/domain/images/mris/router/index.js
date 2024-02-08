import Settings from '../settings';

const routes = [
  {
    path: `/${Settings.domain}`,
    name: Settings.domain,
    meta: { title: "UNITE.MRIs", authorize: true },
    component: () => import(/* webpackChunkName: "mris" */ "../MRIsPage.vue")
  }
];

export default routes;