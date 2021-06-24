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
              title="Mutations"
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
import UFilters from "../../../common/mutations/Filters.vue";
import UMutations from "../../../common/mutations/Mutations.vue";

import apiClient from "../../../../services/api/api.client.mutations.js";

export default {
  props: ["specimen"],

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

      criteria: this.getMutationsSearchCriteria(),
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
      this.setMutationsSelected(value);
    }
  },

  async mounted() {
    this.setMutationsSearchCriteria(this.specimen.id);
  },

  methods: {
    async onInput() {
      this.setMutationsSelected([]);
      await this.fetchData();
    },

    async fetchData() {
      try {
        this.loading = true;
        let data = await apiClient.search(this.criteria);
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
        this.rowsSelected = this.getMutationsSelected();
      } catch {
        this.rows = [];
        this.rowsTotal = 0;
        this.rowsSelected = [];
      } finally {
        this.loading = false;
      }
    },

    getMutationsSearchCriteria() {
      if (this.specimen.tissue) {
        return this.$store.state.tissue.mutationsSearchCriteria;
      } else if (this.specimen.cellLine) {
        return this.$store.state.cell.mutationsSearchCriteria;
      } else if (this.specimen.organoid) {
        return this.$store.state.organoid.mutationsSearchCriteria;
      } else if (this.specimen.xenograft) {
        return this.$store.state.xenograft.mutationsSearchCriteria;
      } else {
        throw 'Not implemented';
      }
    },

    setMutationsSearchCriteria(value) {
      if (this.specimen.tissue) {
        this.criteria.tissueFilters.id.push(value);
      } else if (this.specimen.cellLine) {
        this.criteria.cellLineFilters.id.push(value);
      } else if (this.specimen.organoid) {
        this.criteria.organoidFilters.id.push(value);
      } else if (this.specimen.xenograft) {
        this.criteria.xenograftFilters.id.push(value);
      } else {
        throw "Not implemented";
      }
    },

    getMutationsSelected() {
      if (this.specimen.tissue) {
        return this.$store.state.tissue.mutationsSelected;
      } else if (this.specimen.cellLine) {
        return this.$store.state.cell.mutationsSelected;
      } else if (this.specimen.organoid) {
        return this.$store.state.organoid.mutationsSelected;
      } else if (this.specimen.xenograft) {
        return this.$store.state.xenograft.mutationsSelected;
      } else {
        throw 'Not implemented';
      }
    },

    setMutationsSelected(value) {
      if (this.specimen.tissue) {
        this.$store.state.tissue.mutationsSelected = value;
      } else if (this.specimen.cellLine) {
        this.$store.state.cell.mutationsSelected = value;
      } else if (this.specimen.organoid) {
        this.$store.state.organoid.mutationsSelected = value;
      } else if (this.specimen.xenograft) {
        this.$store.state.xenograft.mutationsSelected = value;
      } else {
        throw 'Not implemented';
      }
    }
  },

  components: {
    UFilters: UFilters,
    UMutations: UMutations,
  },
};
</script>