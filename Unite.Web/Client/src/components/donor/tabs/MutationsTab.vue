<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Mutations</span>
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
    </div>
  </div>
</template>

<script>
import UFilters from "@/components/donor/mutations/Filters.vue";
import UMutations from "@/components/donor/mutations/Mutations.vue";

import apiClient from "@/services/api/api.client.mutations.js";

export default {
  props: ["donor"],

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

      criteria: this.$store.state.donor.searchCriteria,
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
    this.criteria.donorFilters.referenceId.push(this.donor.referenceId);

    // await this.fetchData();
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
    UMutations: UMutations,
  },
};
</script>