import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "@/identity/store";
import createModelsStore from "@/domain/_shared/entries/store";
import createDonorStore from "@/domain/donor/store";
import createImageStore from "@/domain/images/_shared/image/store";
import createSpecimenStore from "@/domain/specimens/_shared/specimen/store";
import createGeneStore from "@/domain/genome/gene/store";
import createSsmStore from "@/domain/genome/variants/ssm/store";
import createCnvStore from "@/domain/genome/variants/cnv/store";
import createSvStore from "@/domain/genome/variants/sv/store";
import OncogridStore from "@/visualization/oncogrid/store";
import AnalysisStore from "@/analysis/store";
import Settings from "@/_settings/settings";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    [Settings.donor.domain]: createDonorStore(),
    [Settings.donors.domain]: createModelsStore(Settings.donors.domain),
    [Settings.mri.domain]: createImageStore(),
    [Settings.mris.domain]: createModelsStore(Settings.mris.domain),
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
    [Settings.ssm.domain]: createSsmStore(),
    [Settings.ssms.domain]: createModelsStore(Settings.ssms.domain),
    [Settings.cnv.domain]: createCnvStore(),
    [Settings.cnvs.domain]: createModelsStore(Settings.cnvs.domain),
    [Settings.sv.domain]: createSvStore(),
    [Settings.svs.domain]: createModelsStore(Settings.svs.domain),
    oncogrid: new OncogridStore(),
    analysis: new AnalysisStore()
  },

  state: {
  }
});

export default store;
