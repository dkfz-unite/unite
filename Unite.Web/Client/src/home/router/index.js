import { createRouter, createWebHistory } from "vue-router";
import { setPageTitle } from "./hooks";
import { authorize } from "../../identity/router/hooks";
import appRoutes from "./routes";
import identityRoutes from "../../identity/router";
import projectRoutes from "../../domain/project/router";
import projectsRoutes from "../../domain/projects/router";
import submissionsRoutes from "../../domain/submissions/router";
import donorRoutes from "../../domain/donor/router";
import donorsRoutes from "../../domain/donors/router";
import mrRoutes from "../../domain/images/mr/router";
import mrsRoutes from "../../domain/images/mrs/router";
import materialRoutes from "../../domain/specimens/material/router";
import materialsRoutes from "../../domain/specimens/materials/router";
import lineRoutes from "../../domain/specimens/line/router";
import linesRoutes from "../../domain/specimens/lines/router";
import organoidRoutes from "../../domain/specimens/organoid/router";
import organoidsRoutes from "../../domain/specimens/organoids/router";
import xenograftRoutes from "../../domain/specimens/xenograft/router";
import xenograftsRoutes from "../../domain/specimens/xenografts/router";
import geneRoutes from "../../domain/omics/gene/router";
import genesRoutes from "../../domain/omics/genes/router";
import smRoutes from "../../domain/omics/variants/sm/router";
import smsRoutes from "../../domain/omics/variants/sms/router";
import cnvRoutes from "../../domain/omics/variants/cnv/router";
import cnvsRoutes from "../../domain/omics/variants/cnvs/router";
import svRoutes from "../../domain/omics/variants/sv/router";
import svsRoutes from "../../domain/omics/variants/svs/router";
import filtersRoutes from "../../datasets/router";
import analysisRoutes from "../../analysis/router";
import adminRoutes from "../../admin/router";
import store from "../store";

const routes = [
  ...appRoutes,
  ...identityRoutes,
  ...projectRoutes,
  ...projectsRoutes,
  ...donorRoutes,
  ...donorsRoutes,
  ...mrRoutes,
  ...mrsRoutes,
  ...materialRoutes,
  ...materialsRoutes,
  ...lineRoutes,
  ...linesRoutes,
  ...organoidRoutes,
  ...organoidsRoutes,
  ...xenograftRoutes,
  ...xenograftsRoutes,
  ...geneRoutes,
  ...genesRoutes,
  ...smRoutes,
  ...smsRoutes,
  ...cnvRoutes,
  ...cnvsRoutes,
  ...svRoutes,
  ...svsRoutes,
  ...filtersRoutes,
  ...analysisRoutes,
  ...adminRoutes,
  ...submissionsRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
