<template>
  <div class="col q-gutter-y-sm">
    <u-filters-drawer
      category="donor"
      :criteria="criteria" 
      :controls="drawer" 
      @filter="onFilter"
    />

    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Donors" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-donors
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          :rows-selected.sync="rowsSelected"
          @request="onRequest"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "../../components/common/filters/Filters.vue";
import UFiltersDrawer from "../../components/common/filters/FiltersDrawer.vue";
import UDonors from "../../components/donors/Donors.vue";

import apiClient from "../../services/api/api.client.donors.js";

export default {
  data() {
    return {
      loading: false,
      rows: [],
      rowsSelected: [],
      rowsTotal: 0,

      criteria: this.$store.state.donors.searchCriteria,
      drawer: this.$store.state.donors.drawer
    };
  },

  watch: {
    rowsSelected(value) {
      this.$store.state.donors.selected = value;
    }
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
        let data = await apiClient.search(this.criteria);
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
        this.rowsSelected = this.$store.state.donors.selected;
      } catch (error) {
        this.rows = [];
        this.rowsTotal = 0;
        this.rowsSelected = [];
      } finally {
        this.loading = false;
      }
    },
  },

  components: {
    UFilters: UFilters,
    UFiltersDrawer: UFiltersDrawer,
    UDonors: UDonors,
  },
};
</script>