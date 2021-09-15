<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col">
        <div class="text-h5 u-text-title">Donors</div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-3 col-md-2">
            <div class="row">
              <u-filters v-model="criteria" @input="onInput" />
            </div>
          </div>

          <div class="col-12 col-sm-9 col-md-10">
            <u-donors
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
import UFilters from "./donors/Filters.vue";
import UDonors from "./donors/Donors.vue";

import apiClient from "../../services/api/api.client.genes.js";

export default {
  props: ["gene"],

  data() {
    return {
      loading: false,
      rows: [],
      rowsSelected: this.$store.state.gene.donorsSelected,
      rowsTotal: 0,
      filters: {
        from: 0,
        size: 10,
        term: null,
      },

      criteria: this.$store.state.gene.donorsSearchCriteria,
    };
  },

  watch: {
    filters(value) {
      this.criteria.from = value.from;
      this.criteria.size = value.size;
      this.criteria.term = value.term;

      this.fetchData();
    },

    rowsSelected(value) {
      this.$store.state.gene.donorsSelected = value;
    }
  },

  async mounted() {
  },

  methods: {
    async onInput() {
      await this.fetchData();
    },

    async fetchData() {
      try {
        this.loading = true;
        let data = await apiClient.getDonors(this.gene.id, this.criteria);
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
      } catch {
        this.rows = [];
        this.rowsTotal = 0;
      } finally {
        this.loading = false;
      }
    },
  },

  components: {
    UFilters: UFilters,
    UDonors: UDonors
  },
};
</script>