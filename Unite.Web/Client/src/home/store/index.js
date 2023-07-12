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
    donors: new SearchPageStore("donors"),
    mri: new ImageStore(),
    mris: new SearchPageStore("mris"),
    tissue: new SpecimenStore(),
    tissues: new SearchPageStore("tissues"),
    cell: new SpecimenStore(),
    cells: new SearchPageStore("cells"),
    organoid: new SpecimenStore(),
    organoids: new SearchPageStore("organoids"),
    xenograft: new SpecimenStore(),
    xenografts: new SearchPageStore("xenografts"),
    gene: new GeneStore(),
    genes: new SearchPageStore("genes"),
    ssm: new SsmStore(),
    ssms: new SearchPageStore("ssms"),
    cnv: new CnvStore(),
    cnvs: new SearchPageStore("cnvs"),
    sv: new SvStore(),
    svs: new SearchPageStore("svs"),
    filters: new FiltersStore(),
    oncogrid: new OncogridStore()
  },

  state: {
  }
});

export default store;