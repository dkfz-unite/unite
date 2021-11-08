<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row q-pl-xs">
      <div>
        <q-btn
          icon="las la-filter"
          dense rounded unelevated
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs 
          v-model="filtersCategory"
          indicator-color="transparent" 
          active-color="primary" 
          align="left" 
          dense vertical>

          <!-- Visualisation -->
          <q-tab v-if="filtersMode.oncogrid" name="oncogrid" icon="las la-chart-area">
            <q-badge v-if="filtersCriteria.oncogridFiltersCriteria.numberOfFilters" :color="getBadgeColor('oncogrid')" rounded>
              {{filtersCriteria.oncogridFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <!-- Data types -->
          <q-tab name="donor" icon="las la-user-circle">
            <q-badge v-if="filtersCriteria.donorFiltersCriteria.numberOfFilters" :color="getBadgeColor('donor')" rounded>
              {{filtersCriteria.donorFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="filtersMode.tissues || filtersMode.general" name="tissue" icon="svguse:icons.svg#u-tissue">
            <q-badge v-if="filtersCriteria.tissueFiltersCriteria.numberOfFilters" :color="getBadgeColor('tissue')" rounded>
              {{filtersCriteria.tissueFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="filtersMode.cells || filtersMode.general" name="cell" icon="las la-microscope">
            <q-badge v-if="filtersCriteria.cellFiltersCriteria.numberOfFilters" :color="getBadgeColor('cell')" rounded>
              {{filtersCriteria.cellFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="filtersMode.organoids || filtersMode.general" name="organoid" icon="svguse:icons.svg#u-organoid">
            <q-badge v-if="filtersCriteria.organoidFiltersCriteria.numberOfFilters" :color="getBadgeColor('organoid')" rounded>
              {{filtersCriteria.organoidFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab v-if="filtersMode.xenografts || filtersMode.general" name="xenograft" icon="svguse:icons.svg#u-mouse">
            <q-badge v-if="filtersCriteria.xenograftFiltersCriteria.numberOfFilters" :color="getBadgeColor('xenograft')" rounded>
              {{filtersCriteria.xenograftFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab name="gene" icon="svguse:/icons.svg#u-gene-alt">
            <q-badge v-if="filtersCriteria.geneFiltersCriteria.numberOfFilters" :color="getBadgeColor('gene')" rounded>
              {{filtersCriteria.geneFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>

          <q-tab name="mutation" icon="svguse:/icons.svg#u-mutation-alt">
            <q-badge v-if="filtersCriteria.mutationFiltersCriteria.numberOfFilters" :color="getBadgeColor('mutation')" rounded>
              {{filtersCriteria.mutationFiltersCriteria.numberOfFilters}}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import filtersMixin from "./filters-mixin";

import FiltersCriteria from "./filters-criteria";
import FiltersContext from "./filters-context";

export default {
  mixins: [filtersMixin],

  props: {
    category: {
      type: String,
      default: "donor"
    },
    
    mode: {
      type: String,
      default: "donor"
    }
  },

  emits: ["update:category"],

  data() {
    return {
      filtersCriteria: this.modelValue || new FiltersCriteria(),
      filtersContext: this.context || new FiltersContext(),
      filtersCategory: this.category,
      filtersMode: {
        general: ["donor", "gene", "mutation"].includes(this.mode),
        tissues: this.mode == "tissue",
        cells: this.mode == "cell",
        organoids: this.mode == "organoid",
        xenografts: this.mode == "xenograft",
        oncogrid: this.mode == "oncogrid"
      }
    };
  },

  watch: {
    modelValue(value) {
      this.filtersCriteria = value || new FiltersCriteria();
    },
    
    filtersCategory(value) {
      this.$emit('update:category', value);
    }
  },

  methods: {
    getBadgeColor(filtersCategory) {
      return this.filtersCategory == filtersCategory
        ? "primary"
        : "grey-5";
    }
  }
}
</script>