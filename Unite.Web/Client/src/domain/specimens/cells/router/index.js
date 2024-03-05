const routes = [
  {
    path: "/cells",
    name: "cells",
    meta: { title: "UNITE.Lines", authorize: true },
    component: () => import(/* webpackChunkName: "cells" */ "../CellsPage.vue")
  }
];

export default routes;