import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "@/identity/store";
import DonorStore from "@/domain/donor/store";
import ImageStore from "@/domain/images/_shared/store";
import SpecimenStore from "@/domain/specimens/_shared/store";
import GeneStore from "@/domain/genome/gene/store";
import SsmStore from "@/domain/genome/variants/ssm/store";
import CnvStore from "@/domain/genome/variants/cnv/store";
import SvStore from "@/domain/genome/variants/sv/store";
import FiltersStore from "@/cohorts/store";
import OncogridStore from "@/visualization/oncogrid/store";
import SearchPageStore from "@/_shared/store/search-page-store";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    donor: new DonorStore(),
    donors: new SearchPageStore(),
    mri: new ImageStore(),
    mris: new SearchPageStore(),
    tissue: new SpecimenStore(),
    tissues: new SearchPageStore(),
    cell: new SpecimenStore(),
    cells: new SearchPageStore(),
    organoid: new SpecimenStore(),
    organoids: new SearchPageStore(),
    xenograft: new SpecimenStore(),
    xenografts: new SearchPageStore(),
    gene: new GeneStore(),
    genes: new SearchPageStore(),
    ssm: new SsmStore(),
    ssms: new SearchPageStore(),
    cnv: new CnvStore(),
    cnvs: new SearchPageStore(),
    sv: new SvStore(),
    svs: new SearchPageStore(),
    filters: new FiltersStore(),
    oncogrid: new OncogridStore()
  },

  state: {
  }
});

export default store;