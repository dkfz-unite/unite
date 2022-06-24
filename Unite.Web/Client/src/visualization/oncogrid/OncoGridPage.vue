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
        v-if="filtersCriteria"
        :mode="filtersMode"
        :context="filtersContext"
        v-model="filtersCriteria"
        v-model:category="filtersCategory"
        @update:modelValue="loadData"
        @close="$refs.drawer.minimize()"
      />
    </template>

    <template #mini>
      <u-filters-mini
        v-if="filtersCriteria"
        :mode="filtersMode"
        :context="filtersContext"
        v-model="filtersCriteria"
        v-model:category="filtersCategory"
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
      <div class="col">
        <u-oncogrid v-if="data" :data="data" />
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="grey" />
    </q-inner-loading>
  </div>
</template>

<script>
import UFiltersButton from "@/_shared/components/filters/FiltersButton.vue";
import UFilters from "@/_shared/components/filters/Filters.vue";
import UFiltersMini from "@/_shared/components/filters/FiltersMini.vue";
import UDrawer from "@/_shared/components/drawers/Drawer.vue";
import UOncogrid from "./components/OncoGrid.vue";

import FiltersCriteria from "@/_shared/components/filters/filters-criteria";
import ConsequenceImpact from '@/_models/domain/genome/mutations/enums/consequence-impact';

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
      data: null,

      drawer: this.$store.state.leftDrawer,
      filtersCriteria: null,
      filtersContext: null,
      filtersCategory: "oncogrid",
      filtersMode: "oncogrid"
    };
  },

  mounted() {
    let mode = this.$route.params.mode;
    let donors = this.$store.state.donors.selected;
    let genes = this.$store.state.genes.selected;
    let filtersCriteria = new FiltersCriteria();

    if (mode == "donors") {
      filtersCriteria = this.$store.state.donors.filtersCriteria.clone();
      filtersCriteria.donorFiltersCriteria.referenceId = donors?.map(donor => donor.referenceId);
    } else if (mode == "genes") {
      filtersCriteria = this.$store.state.genes.filtersCriteria.clone();
      filtersCriteria.geneFiltersCriteria.symbol = genes?.map(gene => gene.symbol);
    }

    if (!filtersCriteria.mutationFiltersCriteria.impact.length){
      filtersCriteria.mutationFiltersCriteria.impact = [
        ConsequenceImpact.High, 
        ConsequenceImpact.Moderate, 
        ConsequenceImpact.Low
      ];
    }

    this.filtersCriteria = filtersCriteria;
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        this.loading = true;
        this.data = null;
        this.data = await this.fetchData();
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
