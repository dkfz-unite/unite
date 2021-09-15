<template>
  <div class="col q-gutter-y-sm">
    <u-filters-drawer
      category="gene"
      :criteria="criteria" 
      :controls="drawer" 
      @filter="fetchData"
    />

    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Genes" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <u-genes
          title="Genes"
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
import UFiltersDrawer from "../../../components/_common/drawers/FiltersDrawer.vue";
import UGenes from "../../../components/genes/Genes.vue";

import apiClient from "../../../services/api/api.client.genes.js";

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

      criteria: this.$store.state.genes.searchCriteria,
      drawer: this.$store.state.genes.drawer
    }
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
    UFiltersDrawer: UFiltersDrawer,
    UGenes: UGenes,
  },
}
</script>