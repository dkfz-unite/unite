<template>
  <div class="col q-gutter-y-sm">
    <u-filters-drawer
      category="mutation"
      :criteria="criteria" 
      :controls="drawer" 
      @filter="fetchData"
    />

    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Mutations" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-mutations
          :loading="loading"
          :rows="rows"
          :rows-total="rowsTotal"
          :rows-selected.sync="rowsSelected"
          :filters.sync="filters"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "../../../components/_common/filters/Filters.vue";
import UFiltersDrawer from "../../../components/_common/drawers/FiltersDrawer.vue";
import UMutations from "../../../components/mutations/Mutations.vue";

import apiClient from "../../../services/api/api.client.mutations.js";

export default {
  data() {
    return {
      loading: false,
      rows: [],
      rowsSelected: [],
      rowsTotal: 0,
      filters: {
        from: 0,
        size: 10,
        term: null,
      },

      criteria: this.$store.state.mutations.searchCriteria,
      drawer: this.$store.state.mutations.drawer
    };
  },

  watch: {
    filters(value) {
      this.criteria.from = value.from;
      this.criteria.size = value.size;
      this.criteria.term = value.term;

      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true;
        let data = await apiClient.search(this.criteria);
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
      } catch (error) {
        this.rows = [];
        this.rowsTotal = 0;
      } finally {
        this.loading = false;
      }
    },
  },

  components: {
    UFilters: UFilters,
    UFiltersDrawer: UFiltersDrawer,
    UMutations: UMutations,
  },
};
</script>