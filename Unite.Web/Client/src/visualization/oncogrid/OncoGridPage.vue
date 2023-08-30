<template>
  <!-- Filters button -->
  <teleport v-if="$q.screen.lt.md" to="#top-left-placeholder">
    <u-filters-button @click="$refs.drawer.open()" />
  </teleport>

  <!-- Filters drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini">
    <template #default>
      <u-filters
        :criteria="filtersCriteria"
        :context="filtersContext"
        :models="models"
        v-model:model="model"
        @update="updateFilters"
        @hide="$refs.drawer.minimize()"
      />
    </template>

    <template #mini>
      <u-filters-mini
        :criteria="filtersCriteria"
        :context="filtersContext"
        :models="models"
        v-model:model="model"
      />
    </template>
  </u-drawer>

  <!-- Page content -->
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }"/>
        <q-breadcrumbs-el label="OncoGrid"/>
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div v-if="!empty" class="col">
        <u-oncogrid v-if="data" :data="data" />
      </div>
      <div v-else class="col">
        <div class="fixed-center">No observations found.</div>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import UDrawer from "@/_shared/components/base/Drawer.vue";
import UFiltersButton from "@/_shared/components/filters/FiltersButton.vue";
import UFilters from "@/_shared/components/filters/Filters.vue";
import UFiltersMini from "@/_shared/components/filters/FiltersMini.vue";
import UOncogrid from "./components/OncoGrid.vue";

import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import FiltersContext from "@/_shared/components/filters/filters-context";
import ConsequenceImpact from '@/_models/domain/genome/variants/enums/consequence-impact';
import { mapOptions } from "@/_shared/components/filters/filter-options-helpers";

import api from "./api";

export default {
  components: {
    UFiltersButton,
    UFilters,
    UFiltersMini,
    UDrawer,
    UOncogrid
  },

  data() {
    return {
      loading: true,
      empty: false,
      data: null,

      drawer: this.$store.state.leftDrawer,
      domain: "oncogrid",
      model: "oncogrid",
      models: ["donor", "gene", "ssm", "oncogrid"],

      filtersCriteria: null,
      filtersContext: null,
      allowedImpacts: [ConsequenceImpact.High, ConsequenceImpact.Moderate, ConsequenceImpact.Low]
    };
  },

  mounted() {
    let mode = this.$route.params.mode;
    let donors = this.$store.state.donors.rowsSelected;
    let genes = this.$store.state.genes.rowsSelected;
    let filtersCriteria = new FiltersCriteria();
    let filtersContext = new FiltersContext();

    if (mode == "donors") {
      filtersCriteria = this.$store.state.donors.filtersCriteria.clone();
      filtersCriteria.donor.referenceId = donors?.map(donor => donor.referenceId);
    } else if (mode == "genes") {
      filtersCriteria = this.$store.state.genes.filtersCriteria.clone();
      filtersCriteria.gene.symbol = genes?.map(gene => gene.symbol);
    }

    if (!filtersCriteria.ssm.consequenceImpactOptions?.length) {
      let allowedOptions = this.allowedImpacts.map(impact => ({ value: impact, label: impact }));
      filtersContext.ssm.consequenceImpactOptions = mapOptions(allowedOptions, ConsequenceImpact.values);
    }

    if (!filtersCriteria.ssm.impact.length){
      filtersCriteria.ssm.impact = this.allowedImpacts;
    } else {
      filtersCriteria.ssm.impact = filtersCriteria.ssm.impact.filter(impact => this.allowedImpacts.includes(impact));
    }

    this.filtersCriteria = filtersCriteria;
    this.filtersContext = filtersContext;
    this.loadData();
  },

  methods: {
    async updateFilters() {
      if (!this.filtersCriteria.ssm.impact?.length) {
        this.filtersCriteria.ssm.impact = this.allowedImpacts;
      }
      await this.loadData();
    },

    async loadData() {
      try {
        this.loading = true;
        this.empty = false;
        this.data = null;

        const response = await this.fetchData();
        
        if (response?.observations?.length) {
          this.data = response;
        } else {
          this.empty = true;
        }
      } catch (error) {
        this.data = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchData() {
      return await api.search(this.filtersCriteria.toSearchCriteria());
    }
  }
}
</script>
