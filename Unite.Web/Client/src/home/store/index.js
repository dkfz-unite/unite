import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "@/identity/store";
import SearchPageStore from "@/_shared/store/search-page-store";
import DonorStore from "@/domain/donor/store";
import ImageStore from "@/domain/images/_shared/image/store";
import SpecimenStore from "@/domain/specimens/_shared/specimen/store";
import GeneStore from "@/domain/genome/gene/store";
import SsmStore from "@/domain/genome/variants/ssm/store";
import CnvStore from "@/domain/genome/variants/cnv/store";
import SvStore from "@/domain/genome/variants/sv/store";
import OncogridStore from "@/visualization/oncogrid/store";
import AnalysisStore from "@/analysis/store";
import Settings from "@/_settings/settings";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    [Settings.donor.domain]: new DonorStore(),
    [Settings.donors.domain]: new SearchPageStore(Settings.donors.domain),
    [Settings.mri.domain]: new ImageStore(),
    [Settings.mris.domain]: new SearchPageStore(Settings.mris.domain),
    [Settings.material.domain]: new SpecimenStore(),
    [Settings.materials.domain]: new SearchPageStore(Settings.materials.domain),
    [Settings.line.domain]: new SpecimenStore(),
    [Settings.lines.domain]: new SearchPageStore(Settings.lines.domain),
    [Settings.organoid.domain]: new SpecimenStore(),
    [Settings.organoids.domain]: new SearchPageStore(Settings.organoids.domain),
    [Settings.xenograft.domain]: new SpecimenStore(),
    [Settings.xenografts.domain]: new SearchPageStore(Settings.xenografts.domain),
    [Settings.gene.domain]: new GeneStore(),
    [Settings.genes.domain]: new SearchPageStore(Settings.genes.domain),
    [Settings.ssm.domain]: new SsmStore(),
    [Settings.ssms.domain]: new SearchPageStore(Settings.ssms.domain),
    [Settings.cnv.domain]: new CnvStore(),
    [Settings.cnvs.domain]: new SearchPageStore(Settings.cnvs.domain),
    [Settings.sv.domain]: new SvStore(),
    [Settings.svs.domain]: new SearchPageStore(Settings.svs.domain),
    oncogrid: new OncogridStore(),
    analysis: new AnalysisStore()
  },

  state: {
  }
});

export default store;