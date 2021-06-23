import Vue from "vue";
import Vuex from "vuex";

import Gender from "../services/criteria/filters/data/donors/filter.option.gender.js";
import VitalStatus from "../services/criteria/filters/data/donors/filter.option.vital.status.js";

import Chromosome from "../services/criteria/filters/data/mutations/filter.option.chromosome.js";
import SequenceType from "../services/criteria/filters/data/mutations/filter.option.sequence.type.js";
import MutationType from "../services/criteria/filters/data/mutations/filter.option.mutation.type.js";
import Impact from "../services/criteria/filters/data/mutations/filter.option.impact.js";
import ConsequenceType from "../services/criteria/filters/data/mutations/filter.option.consequence.type.js";

import TissueType from "../services/criteria/filters/data/specimens/tissues/filter.option.tissue-type.js";
import TumorType from "../services/criteria/filters/data/specimens/tissues/filter.option.tumor-type.js";

import Species from "../services/criteria/filters/data/specimens/cells/filter.option.species.js";
import CellLineType from "../services/criteria/filters/data/specimens/cells/filter.option.cell-type.js";
import CellLineCultureType from "../services/criteria/filters/data/specimens/cells/filter.options.cell-culture-type.js";

import MgmtStatus from "../services/criteria/filters/data/specimens/filter.option.mgmt-status.js";
import IdhStatus from "../services/criteria/filters/data/specimens/filter.option.idh-status.js";
import IdhMutation from "../services/criteria/filters/data/specimens/filter.option.idh-mutation.js";
import GeneExpressionSubtype from "../services/criteria/filters/data/specimens/filter.option.gene-expression-subtype.js";
import MethylationSubtype from "../services/criteria/filters/data/specimens/filter.option.methylation-subtype.js";

import donorModule from "./modules/donor";
import donorsModule from "./modules/donors";
import tissueModule from "./modules/tissue";
import tissuesModule from "./modules/tissues";
import cellModule from "./modules/cell";
import cellsModule from "./modules/cells";
import mutationModule from "./modules/mutation";
import mutationsModule from "./modules/mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    donor: donorModule,
    donors: donorsModule,
    tissue: tissueModule,
    tissues: tissuesModule,
    cell: cellModule,
    cells: cellsModule,
    mutation: mutationModule,
    mutations: mutationsModule
  },

  state: {
    drawers: {
      left: {
        display: false,
        show: false
      },
      right: {
        display: false,
        show: false
      }
    },

    account: {
      email: null
    },

    filterOptions: {
      genders: Gender.availableOptions,
      vitalStatuses: VitalStatus.availableOptions,

      chromosomes: Chromosome.availableOptions,
      sequenceTypes: SequenceType.availableOptions,
      mutationTypes: MutationType.availableOptions,
      impacts: Impact.availableOptions,
      consequenceTypes: ConsequenceType.availableOptions,

      tissueTypes: TissueType.availableOptions,
      tumorTypes: TumorType.availableOptions,

      species: Species.availableOptions,
      cellLineTypes: CellLineType.availableOptions,
      cellLineCultureTypes: CellLineCultureType.availableOptions,

      mgmtStatuses: MgmtStatus.availableOptions,
      idhStatuses: IdhStatus.availableOptions,
      idhMutations: IdhMutation.availableOptions,
      geneExpressionSubtypes: GeneExpressionSubtype.availableOptions,
      methylationSubtypes: MethylationSubtype.availableOptions
    }
  }
});
