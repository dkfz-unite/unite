import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle } from "./hooks";
import { authorize } from "../../identity/router/hooks";
import appRoutes from "./routes";
import identityRoutes from "../../identity/router";
import donorRoutes from "../../domain/donor/router";
import donorsRoutes from "../../domain/donors/router";
import mriRoutes from "../../domain/images/mri/router";
import mrisRoutes from "../../domain/images/mris/router";
import tissueRoutes from "../../domain/specimens/tissue/router";
import tissuesRoutes from "../../domain/specimens/tissues/router";
import cellRoutes from "../../domain/specimens/cell/router";
import cellsRoutes from "../../domain/specimens/cells/router";
import organoidRoutes from "../../domain/specimens/organoid/router";
import organoidsRoutes from "../../domain/specimens/organoids/router";
import xenograftRoutes from "../../domain/specimens/xenograft/router";
import xenograftsRoutes from "../../domain/specimens/xenografts/router";
import geneRoutes from "../../domain/genome/gene/router";
import genesRoutes from "../../domain/genome/genes/router";
import mutationRoutes from "../../domain/genome/mutation/router";
import mutationsRoutes from "../../domain/genome/mutations/router";
import filtersRoutes from "../../filters/router";
import oncogridRoutes from "../../visualization/oncogrid/router";
import store from "../store";

const routes = [
  ...appRoutes,
  ...identityRoutes,
  ...donorRoutes,
  ...donorsRoutes,
  ...mriRoutes,
  ...mrisRoutes,
  ...tissueRoutes,
  ...tissuesRoutes,
  ...cellRoutes,
  ...cellsRoutes,
  ...organoidRoutes,
  ...organoidsRoutes,
  ...xenograftRoutes,
  ...xenograftsRoutes,
  ...geneRoutes,
  ...genesRoutes,
  ...mutationRoutes,
  ...mutationsRoutes,
  ...filtersRoutes,
  ...oncogridRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

router.beforeEach((to, from, next) => {
  authorize({ to, from, next }, store.state.identity);
  setPageTitle({ to, from, next });
});

export default router;