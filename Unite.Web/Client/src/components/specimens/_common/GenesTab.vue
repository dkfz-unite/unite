<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Genes</span>
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
    </div>
  </div>
</template>

<script>
import UFilters from "./genes/Filters.vue";
import UGenes from "./genes/Genes.vue";

import apiClient from "../../../services/api/api.client.specimens.js";

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

      criteria: this.getGenesSearchCriteria()
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
      this.setGenesSelected(value);
    }
  },

  methods: {
    async onInput() {
      this.setGenesSelected([]);
      await this.fetchData();
    },

    async fetchData() {
      try {
        this.loading = true;
        let data = await apiClient.getGenes(this.specimen.id, this.criteria);
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
        this.rowsSelected = this.getGenesSelected()
      } catch {
        this.rows = [];
        this.rowsTotal = 0;
        this.rowsSelected = [];
      } finally {
        this.loading = false;
      }
    },

    getGenesSearchCriteria() {
      if (this.specimen.tissue) {
        return this.$store.state.tissue.genesSearchCriteria;
      } else if (this.specimen.cellLine) {
        return this.$store.state.cell.genesSearchCriteria;
      } else if (this.specimen.organoid) {
        return this.$store.state.organoid.genesSearchCriteria;
      } else if (this.specimen.xenograft) {
        return this.$store.state.xenograft.genesSearchCriteria;
      } else {
        throw 'Not implemented';
      }
    },

    getGenesSelected() {
      if (this.specimen.tissue) {
        return this.$store.state.tissue.genesSelected;
      } else if (this.specimen.cellLine) {
        return this.$store.state.cell.genesSelected;
      } else if (this.specimen.organoid) {
        return this.$store.state.organoid.genesSelected;
      } else if (this.specimen.xenograft) {
        return this.$store.state.xenograft.genesSelected;
      } else {
        throw 'Not implemented';
      }
    },

    setGenesSelected(value) {
      if (this.specimen.tissue) {
        this.$store.state.tissue.genesSelected = value;
      } else if (this.specimen.cellLine) {
        this.$store.state.cell.genesSelected = value;
      } else if (this.specimen.organoid) {
        this.$store.state.organoid.genesSelected = value;
      } else if (this.specimen.xenograft) {
        this.$store.state.xenograft.genesSelected = value;
      } else {
        throw 'Not implemented';
      }
    }
  },

  components: {
    UFilters: UFilters,
    UGenes: UGenes,
  },
};
</script>