import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "@/identity/store";
import SearchPageStore from "@/_shared/store/search-page-store";
import DonorStore from "@/domain/donor/store";
import ImageStore from "@/domain/images/_shared/store";
import SpecimenStore from "@/domain/specimens/_shared/store";
import GeneStore from "@/domain/genome/gene/store";
import SsmStore from "@/domain/genome/variants/ssm/store";
import CnvStore from "@/domain/genome/variants/cnv/store";
import SvStore from "@/domain/genome/variants/sv/store";
import OncogridStore from "@/visualization/oncogrid/store";
import AnalysisStore from "@/analysis/store";
import DomainNames from "@/_settings/domain-names";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    donor: new DonorStore(),
    donors: new SearchPageStore(DomainNames.Donors),
    mri: new ImageStore(),
    mris: new SearchPageStore(DomainNames.Mris),
    material: new SpecimenStore(),
    materials: new SearchPageStore(DomainNames.Tissues),
    line: new SpecimenStore(),
    lines: new SearchPageStore(DomainNames.Cells),
    organoid: new SpecimenStore(),
    organoids: new SearchPageStore(DomainNames.Organoids),
    xenograft: new SpecimenStore(),
    xenografts: new SearchPageStore(DomainNames.Xenografts),
    gene: new GeneStore(),
    genes: new SearchPageStore(DomainNames.Genes),
    ssm: new SsmStore(),
    ssms: new SearchPageStore(DomainNames.Ssms),
    cnv: new CnvStore(),
    cnvs: new SearchPageStore(DomainNames.Cnvs),
    sv: new SvStore(),
    svs: new SearchPageStore(DomainNames.Svs),
    // filters: new FiltersStore(),
    oncogrid: new OncogridStore(),
    analysis: new AnalysisStore()
  },

  state: {
  }
});

export default store;