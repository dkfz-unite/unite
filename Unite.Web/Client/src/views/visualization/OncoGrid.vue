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
        <u-oncogrid v-if="!!data" :data="data" :showing="!loading"/>
        <q-inner-loading :showing="loading">
          <q-spinner color="primary" size="3em" :thickness="2"/>
        </q-inner-loading>
      </div>
    </div>
  </div>
</template>

<script>
import UFiltersDrawer from "../../components/_common/drawers/FiltersDrawer.vue";
import UOncogrid from "../../components/visualization/oncogrid/OncoGrid.vue";

import apiClient from "../../services/api/visualization/api.client.oncogrid.js";

export default {
  props: ["mode", "donors", "genes"],

  data() {
    return {
      loading: true,
      data: null,

      criteria: this.$store.state.oncogrid.searchCriteria,
      drawer: this.$store.state.oncogrid.drawer
    };
  },

  async mounted() {
    if (this.mode == "donors") {
      this.criteria = this.$store.state.donors.searchCriteria.clone();

      if (this.donors?.length) {
        this.criteria.donorFilters.referenceId = this.donors.map(donor => donor.referenceId);
      }
    } else if (this.mode == "genes") {
      this.criteria = this.$store.state.genes.searchCriteria.clone();

      if (this.genes?.length) {
        this.criteria.geneFilters.symbol = this.genes.map(gene => gene.symbol);
      }
    }
    await this.fetchData();
  },

  async destroyed() {
    this.$store.dispatch("oncogrid/clearState");
  },

  methods: {
    async onFilter() {
      await this.fetchData();
    },

    async fetchData() {
      try {
        this.loading = true;
        this.data = null;
        this.data = await apiClient.search(this.criteria);
      } catch (error) {
        this.data = null;
      } finally {
        this.loading = false;
      }
    },
  },

  components: {
    UFiltersDrawer: UFiltersDrawer,
    UOncogrid: UOncogrid,
  },
}
</script>
