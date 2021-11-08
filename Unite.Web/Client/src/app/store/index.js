import { createStore } from "vuex";

import leftDrawerModule from "./modules/drawers/left";
import rightDrawerModule from "./modules/drawers/right";
import identityModule from "../../identity/store";
import donorModule from "../../domain/donor/store";
import donorsModule from "../../domain/donors/store";
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
import mutationModule from "../../domain/genome/mutation/store";
import mutationsModule from "../../domain/genome/mutations/store";
import filtersModule from "../../filters/store";
import oncogridModule from "../../visualization/oncogrid/store";

export default createStore({
  modules: {
    leftDrawer: leftDrawerModule,
    rightDrawer: rightDrawerModule,
    identity: identityModule,
    donor: donorModule,
    donors: donorsModule,
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
    mutation: mutationModule,
    mutations: mutationsModule,
    filters: filtersModule,
    oncogrid: oncogridModule
  },

  state: {
  }
})