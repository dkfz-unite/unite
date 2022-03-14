<template>
  <div class="col">
    <q-table
      class="sticky-header-slim"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :title="title"
      :columns="columns"
      :rows="data"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'gene', params: { id: props.value.id.toString() }}">
            {{ props.value.symbol }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-specimens="props">
        <q-td :props="props">
          <u-specimens :specimens="props.value" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import USpecimens from "../_shared/genome/Specimens.vue";
import tableMixin from "@/domain/_shared/table-mixin";

import Biotype from "@/_models/domain/genome/genes/enums/biotype";

export default {
  components: {
    USpecimens
  },

  mixins: [tableMixin],

  data() {
    return {
      columns: [
        {
          name: "name",
          label: "Name",
          field: (row) => row,
          sortable: false,
          align: "left"
        },
        {
          name: "location",
          label: "Location",
          field: (row) => this.getLocation(row),
          sortable: false,
          align: "left"
        },
        {
          name: "biotype",
          label: "Biotype",
          field: (row) => this.$helpers.enum.getLabel(row.biotype, Biotype.values),
          sortable: false,
          align: "left"
        },
        {
          name: "specimens",
          label: "Specimens",
          field: row => this.getSpecimensView(row.specimens),
          sortable: false,
          align: "left"
        },
        {
          name: "numberOfDonors",
          label: "#Affected Donors",
          field: (row) => row.numberOfDonors,
          sortable: false
        },
        {
          name: "numberOfMutations",
          label: "#Mutations",
          field: (row) => row.numberOfMutations,
          sortable: false
        }
      ]
    };
  },

  methods: {
    getLocation(gene) {
      if (gene.chromosome && gene.start && gene.end) {
        return `chr${gene.chromosome}:${gene.start}-${gene.end}`;
      } else {
        return null;
      }
    },

    getSpecimensView(specimens) {
      if (specimens?.length) {
        return {
          tissues: specimens.filter(specimen => !!specimen.tissue),
          cells: specimens.filter(specimen => !!specimen.cellLine),
          organoids: specimens.filter(specimen => !!specimen.organoid),
          xenografts: specimens.filter(specimen => !!specimen.xenograft)
        };
      } else {
        return null;
      }
    }
  }
}
</script>