<template>
  <div class="col q-gutter-y-sm">
    <u-filters-drawer
        category="oncogrid"
        :criteria="criteria"
        :controls="drawer"
        @filter="onFilter"
    />

    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }"/>
        <q-breadcrumbs-el label="OncoGrid"/>
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <oncogrid v-if="!!oncoGridData" :onco-grid-data="oncoGridData" :showing="!loading"/>
        <q-inner-loading :showing="loading">
          <q-spinner color="primary" size="3em" :thickness="2"/>
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "../../components/common/filters/Filters.vue";
import UFiltersDrawer from "../../components/common/filters/FiltersDrawer.vue";
import Oncogrid from "../../components/oncogrid/OncoGrid";

import apiClient from "../../services/api/api.client.oncogrid.js";

export default {
  props: ["selectedDonors", "preselectFilters"],
  data() {
    return {
      loading: true,
      oncoGridData: null,
      
      criteria: this.$store.state.oncogrid.searchCriteria,
      drawer: this.$store.state.oncogrid.drawer
    };
  },

  async mounted() {
    if (this.preselectFilters) {
      this.criteria.donorFilters = this.$store.state.donors.searchCriteria.donorFilters;
      this.criteria.mutationFilters = this.$store.state.donors.searchCriteria.mutationFilters;
    }
    if (this.selectedDonors != null && this.selectedDonors.length > 0) {
      this.criteria.donorFilters.referenceId = []
      for (const selectedDonor of this.selectedDonors) {
        this.criteria.donorFilters.referenceId.push(selectedDonor.referenceId)
      }
    }
    await this.fetchData();
  },

  methods: {
    async onFilter() {
      this.$store.state.donors.selected = [];
      await this.fetchData();
    },

    async onRequest(filters) {
      this.criteria.from = filters.from;
      this.criteria.size = filters.size;
      this.criteria.term = filters.term;

      await this.fetchData();
    },

    async fetchData() {
      try {
        this.loading = true;
        this.oncoGridData = null;
        this.oncoGridData = await apiClient.search(this.criteria);
      } catch (error) {
        this.oncoGridData = null;
      } finally {
        this.loading = false;
      }
    },
  },

  components: {
    UFilters: UFilters,
    UFiltersDrawer: UFiltersDrawer,
    Oncogrid: Oncogrid,
  },
}
</script>
