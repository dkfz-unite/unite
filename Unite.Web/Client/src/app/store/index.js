import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "../../identity/store";
import donorModule from "../../domain/donor/store";
import donorsModule from "../../domain/donors/store";
import mriModule from "../../domain/images/mri/store";
import mrisModule from "../../domain/images/mris/store";
import tissueModule from "../../domain/specimens/tissue/store";
import tissuesModule from "../../domain/specimens/tissues/store";
import cellModule from "../../domain/specimens/cell/store";
import cellsModule from "../../domain/specimens/cells/store";
import organoidModule from "../../domain/specimens/organoid/store";
import organoidsModule from "../../domain/specimens/organoids/store";
import xenograftModule from "../../domain/specimens/xenograft/store";
import xenograftsModule from "../../domain/specimens/xenografts/store";
import geneModule from "../../domain/genome/gene/store";
import genesModule from "../../domain/genome/genes/store";
import ssmModule from "../../domain/genome/variants/ssm/store";
import ssmsModule from "../../domain/genome/variants/ssms/store";
import cnvModule from "../../domain/genome/variants/cnv/store";
import cnvsModule from "../../domain/genome/variants/cnvs/store";
import svModule from "../../domain/genome/variants/sv/store";
import svsModule from "../../domain/genome/variants/svs/store";
import filtersModule from "../../filters/store";
import oncogridModule from "../../visualization/oncogrid/store";

export default createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    donor: donorModule,
    donors: donorsModule,
    mri: mriModule,
    mris: mrisModule,
    tissue: tissueModule,
    tissues: tissuesModule,
    cell: cellModule,
    cells: cellsModule,
    organoid: organoidModule,
    organoids: organoidsModule,
    xenograft: xenograftModule,
    xenografts: xenograftsModule,
    gene: geneModule,
    genes: genesModule,
    ssm: ssmModule,
    ssms: ssmsModule,
    cnv: cnvModule,
    cnvs: cnvsModule,
    sv: svModule,
    svs: svsModule,
    filters: filtersModule,
    oncogrid: oncogridModule
  },

  state: {
  }
})