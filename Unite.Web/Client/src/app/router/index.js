import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle } from "./hooks";
import { authorize } from "../../identity/router/hooks";
import appRoutes from "./routes";
import identityRoutes from "../../identity/router";
import projectRoutes from "../../domain/project/router";
import projectsRoutes from "../../domain/projects/router";
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
import ssmRoutes from "../../domain/genome/variants/ssm/router";
import ssmsRoutes from "../../domain/genome/variants/ssms/router";
import cnvRoutes from "../../domain/genome/variants/cnv/router";
import cnvsRoutes from "../../domain/genome/variants/cnvs/router";
import svRoutes from "../../domain/genome/variants/sv/router";
import svsRoutes from "../../domain/genome/variants/svs/router";
import filtersRoutes from "../../filters/router";
import oncogridRoutes from "../../visualization/oncogrid/router";
import adminRoutes from "../../admin/router";
import store from "../store";

const routes = [
  ...appRoutes,
  ...identityRoutes,
  ...projectRoutes,
  ...projectsRoutes,
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
  ...ssmRoutes,
  ...ssmsRoutes,
  ...cnvRoutes,
  ...cnvsRoutes,
  ...svRoutes,
  ...svsRoutes,
  ...filtersRoutes,
  ...oncogridRoutes,
  ...adminRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

router.beforeEach(async (to, from, next) => {
  let route = null;
  
  route = await setPageTitle({ to, from, next });
  if (!!route) next(route);

  route = await authorize({ to, from, next }, store);
  if (!!route) next(route);

  else next();
});

export default router;
