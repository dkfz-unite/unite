import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

import Gender from '@/services/criteria/filters/data/donors/filter.option.gender.js';
import VitalStatus from '@/services/criteria/filters/data/donors/filter.option.vital.status.js';
import AgeCategory from '@/services/criteria/filters/data/donors/filter.option.age.category.js';

import Chromosome from '@/services/criteria/filters/data/mutations/filter.option.chromosome.js';
import SequenceType from '@/services/criteria/filters/data/mutations/filter.option.sequence.type.js';
import MutationType from '@/services/criteria/filters/data/mutations/filter.option.mutation.type.js';

import CellLineType from '@/services/criteria/filters/data/cells/filter.option.cell.type.js';
import GeneExpressionSubtype from '@/services/criteria/filters/data/cells/filter.option.gene.expression.subtype.js';
import IDHStatus from '@/services/criteria/filters/data/cells/filter.option.idh.status.js';
import IDHMutation from '@/services/criteria/filters/data/cells/filter.option.idh.mutation.js';
import MethylationStatus from '@/services/criteria/filters/data/cells/filter.option.methylation.status.js';
import MethylationSubtype from '@/services/criteria/filters/data/cells/filter.option.methylation.subtype.js';
import Species from '@/services/criteria/filters/data/cells/filter.option.species.js';


import SearchCriteria from '@/services/criteria/criteria.search.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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

    filterOptions: {
      genders: Gender.availableOptions,
      ageCategories: AgeCategory.availableOptions,
      vitalStatuses: VitalStatus.availableOptions,

      chromosomes: Chromosome.availableOptions,
      sequenceTypes: SequenceType.availableOptions,
      mutationTypes: MutationType.availableOptions,

      cellLineTypes: CellLineType.availableOptions,
      geneExpressionSubtypes: GeneExpressionSubtype.availableOptions,
      idhStatuses: IDHStatus.availableOptions,
      idhMutations: IDHMutation.availableOptions,
      methylationStatuses: MethylationStatus.availableOptions,
      methylationSubtypes: MethylationSubtype.availableOptions,
      species: Species.availableOptions
    }
  },

  getters: getters,

  mutations: mutations,

  actions: actions
})
