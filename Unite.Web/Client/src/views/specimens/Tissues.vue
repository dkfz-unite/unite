<template>
  <div class="col q-gutter-y-sm">
    <u-filters-drawer
      category="tissue"
      :criteria="criteria" 
      :controls="drawer" 
      @filter="fetchData"
    />

    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el icon="home" :to="{ name: 'home' }" />
        <q-breadcrumbs-el label="Tissues" />
      </q-breadcrumbs>
    </div>

    <!-- <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <u-filters v-model="criteria" selected="tissue" @input="fetchData" />
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-tissues
              :loading="loading"
              :rows="rows"
              :rows-total="rowsTotal"
              :rows-selected.sync="rowsSelected"
              :filters.sync="filters"
            />
          </div>
        </div>
      </div>
    </div> -->

    <div class="row">
      <div class="col">
        <u-tissues
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
import UFilters from "../../components/common/filters/Filters.vue";
import UFiltersDrawer from "../../components/common/filters/FiltersDrawer.vue";
import UTissues from "../../components/specimens/tissues/Tissues.vue";

import apiClient from "../../services/api/api.client.tissues.js";

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

      criteria: this.$store.state.tissues.searchCriteria,
      drawer: this.$store.state.tissues.drawer
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
    }
  },

  components: {
    UFilters: UFilters,
    UFiltersDrawer: UFiltersDrawer,
    UTissues: UTissues,
  },
}
</script>