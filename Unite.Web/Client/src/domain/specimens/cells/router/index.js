const routes = [
  {
    path: '/cells',
    name: 'cells',
    meta: { title: "UNITE.Cells", authorize: true },
    component: () => import(/* webpackChunkName: "cells" */ '../CellsPage.vue')
  }
];

export default routes;