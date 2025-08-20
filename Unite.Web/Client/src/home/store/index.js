import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "@/identity/store";
import createModelsStore from "@/domain/_shared/entries/store";
import createProjectStore from "@/domain/project/store";
import createDonorStore from "@/domain/donor/store";
import createImageStore from "@/domain/images/_shared/image/store";
import createSpecimenStore from "@/domain/specimens/_shared/specimen/store";
import createGeneStore from "@/domain/omics/gene/store";
import createSmStore from "@/domain/omics/variants/sm/store";
import createCnvStore from "@/domain/omics/variants/cnv/store";
import createSvStore from "@/domain/omics/variants/sv/store";
import DatasetStore from "@/datasets/store";
import AnalysisStore from "@/analysis/store";
import Settings from "@/_settings/settings";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    [Settings.project.domain]: createProjectStore(),
    [Settings.projects.domain]: createModelsStore(Settings.projects.domain),
    [Settings.donor.domain]: createDonorStore(),
    [Settings.donors.domain]: createModelsStore(Settings.donors.domain),
    [Settings.mr.domain]: createImageStore(),
    [Settings.mrs.domain]: createModelsStore(Settings.mrs.domain),
    [Settings.material.domain]: createSpecimenStore(),
    [Settings.materials.domain]: createModelsStore(Settings.materials.domain),
    [Settings.line.domain]: createSpecimenStore(),
    [Settings.lines.domain]: createModelsStore(Settings.lines.domain),
    [Settings.organoid.domain]: createSpecimenStore(),
    [Settings.organoids.domain]: createModelsStore(Settings.organoids.domain),
    [Settings.xenograft.domain]: createSpecimenStore(),
    [Settings.xenografts.domain]: createModelsStore(Settings.xenografts.domain),
    [Settings.gene.domain]: createGeneStore(),
    [Settings.genes.domain]: createModelsStore(Settings.genes.domain),
    [Settings.sm.domain]: createSmStore(),
    [Settings.sms.domain]: createModelsStore(Settings.sms.domain),
    [Settings.cnv.domain]: createCnvStore(),
    [Settings.cnvs.domain]: createModelsStore(Settings.cnvs.domain),
    [Settings.sv.domain]: createSvStore(),
    [Settings.svs.domain]: createModelsStore(Settings.svs.domain),
    datasets: new DatasetStore(),
    analysis: new AnalysisStore()
  },

  state: {
    visible: true
  }
});

export default store;
