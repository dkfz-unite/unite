<template>
  <div class="col">
    <q-table
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :title="title"
      :columns="columns"
      :data="data"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-x-md">
          <q-btn
            label="Oncogrid" icon="las la-chart-area" color="primary" dense flat no-caps
            :to="{ name: 'oncogrid', params: { mode: 'genes', genes: rowsSelected }}" 
          />
          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'gene', params: { id: props.value.id.toString() }}">
            {{ props.value.symbol }}
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import Biotype from "../../services/criteria/filters/data/mutations/filter.option.biotype.js";

import tableMixin from "../_common/_mixins/mixin.table.js";

export default {
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
          field: (row) => new Biotype(row.biotype).label,
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
    }
  },

  methods: {
    getLocation(gene) {
      if (gene.chromosome && gene.start && gene.end) {
        return `chr${gene.chromosome}:${gene.start}-${gene.end}`;
      } else {
        return null;
      }
    }
  }
}
</script>