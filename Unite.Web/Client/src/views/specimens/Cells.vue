<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Cell Lines" />
      </q-breadcrumbs>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <u-filters v-model="criteria" selected="cell" @input="fetchData" />
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-cells
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              :rows-selected.sync="rowsSelected"
              :filters.sync="filters"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UFilters from "@/components/common/filters/Filters.vue";
import UCells from "@/components/specimens/cells/Cells.vue";

import apiClient from "@/services/api/api.client.cells.js";

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

      criteria: this.$store.state.specimens.searchCriteria
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
        this.loading = false;
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
      } catch (error) {
        this.loading = false;
        this.rows = [];
        this.rowsTotal = 0;
      }
    }
  },

  components: {
    UFilters: UFilters,
    UCells: UCells,
  },
};
</script>