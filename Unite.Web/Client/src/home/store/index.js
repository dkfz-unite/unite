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
import DomainStore from "@/domain/_shared/store/domain-store";

const store = createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    donor: new DonorStore(),
    donors: new DomainStore("donors", "donors"),
    mri: new ImageStore(),
    mris: new DomainStore("mris", "images/mri"),
    tissue: new SpecimenStore(),
    tissues: new DomainStore("tissues", "specimens/tissue"),
    cell: new SpecimenStore(),
    cells: new DomainStore("cells", "specimens/cellline"),
    organoid: new SpecimenStore(),
    organoids: new DomainStore("organoids", "specimens/organoid"),
    xenograft: new SpecimenStore(),
    xenografts: new DomainStore("xenografts", "specimens/xenograft"),
    gene: new GeneStore(),
    genes: new DomainStore("genes", "genes"),
    ssm: new SsmStore(),
    ssms: new DomainStore("ssms", "variants/ssm"),
    cnv: new CnvStore(),
    cnvs: new DomainStore("cnvs", "variants/cnv"),
    sv: new SvStore(),
    svs: new DomainStore("svs", "variants/sv"),
    filters: new FiltersStore(),
    oncogrid: new OncogridStore()
  },

  state: {
  }
});

export default store;