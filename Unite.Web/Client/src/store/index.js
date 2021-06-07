import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

import Gender from '@/services/criteria/filters/data/donors/filter.option.gender.js';
import VitalStatus from '@/services/criteria/filters/data/donors/filter.option.vital.status.js';

import Chromosome from '@/services/criteria/filters/data/mutations/filter.option.chromosome.js';
import SequenceType from '@/services/criteria/filters/data/mutations/filter.option.sequence.type.js';
import MutationType from '@/services/criteria/filters/data/mutations/filter.option.mutation.type.js';
import Impact from '@/services/criteria/filters/data/mutations/filter.option.impact.js';
import ConsequenceType from '@/services/criteria/filters/data/mutations/filter.option.consequence.type.js';

import TissueType from '@/services/criteria/filters/data/specimens/tissues/filter.option.tissue-type.js';
import TumourType from '@/services/criteria/filters/data/specimens/tissues/filter.option.tumour-type.js';

import CellLineType from '@/services/criteria/filters/data/specimens/cells/filter.option.cell-type.js';
import Species from '@/services/criteria/filters/data/specimens/cells/filter.option.species.js';

import GeneExpressionType from '@/services/criteria/filters/data/specimens/filter.option.gene-expression-type.js';
import IDHStatus from '@/services/criteria/filters/data/specimens/filter.option.idh-status.js';
import IDHMutation from '@/services/criteria/filters/data/specimens/filter.option.idh-mutation.js';
import MethylationStatus from '@/services/criteria/filters/data/specimens/filter.option.methylation-status.js';
import MethylationType from '@/services/criteria/filters/data/specimens/filter.option.methylation-type.js';

import SearchCriteria from '@/services/criteria/criteria.search.js';

Vue.use(Vuex)

export default new Vuex.Store({
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

    mutations: {
      selected: [],
      searchCriteria: new SearchCriteria()
    },

    mutation: {
      selected: [],
      searchCriteria: new SearchCriteria()
    },

    donors: {
      selected: [],
      searchCriteria: new SearchCriteria()
    },

    donor: {
      selected: [],
      searchCriteria: new SearchCriteria()
    },

    specimens: {
      selected: [],
      searchCriteria: new SearchCriteria()
    },

    specimen: {
      selected: [],
      searchCriteria: new SearchCriteria()
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
      tumourTypes: TumourType.availableOptions,

      cellLineTypes: CellLineType.availableOptions,
      species: Species.availableOptions,

      geneExpressionTypes: GeneExpressionType.availableOptions,
      idhStatuses: IDHStatus.availableOptions,
      idhMutations: IDHMutation.availableOptions,
      methylationStatuses: MethylationStatus.availableOptions,
      methylationTypes: MethylationType.availableOptions
    }
  },

  getters: getters,

  mutations: mutations,

  actions: actions
})
