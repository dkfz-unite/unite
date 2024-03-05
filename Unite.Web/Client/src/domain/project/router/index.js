import Settings from "../settings";

const routes = [
  {
    path: `/projects/:id`,
    name: Settings.domain,
    meta: { title: `UNITE - ${Settings.title}`, authorize: true },
    component: () => import(/* webpackChunkName: "project" */ "../Page.vue")
  }
];

export default routes;
