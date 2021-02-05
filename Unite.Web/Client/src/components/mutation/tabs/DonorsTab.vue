<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Donors</span>
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
import UFilters from "@/components/mutation/donors/Filters.vue";
import UDonors from "@/components/mutation/donors/Donors.vue";

import apiClient from "@/services/api/api.client.donors.js";

export default {
  props: ["mutation"],

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

      criteria: this.$store.state.mutation.searchCriteria,
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

  async mounted() {
    this.criteria.mutationFilters.id.push(this.mutation.id);

    await this.fetchData();
  },

  methods: {
    async onInput() {
      await this.fetchData();
    },

    async fetchData() {
      this.loading = true;

      let data = await apiClient.search(this.criteria);

      this.loading = false;

      this.rows = data ? data.rows : [];
      this.rowsTotal = data ? data.total : 0;
    },
  },

  components: {
    UFilters: UFilters,
    UDonors: UDonors
  },
};
</script>