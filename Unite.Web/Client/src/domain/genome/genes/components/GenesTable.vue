<template>
  <div class="col">
    <q-table
      :title="title"
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :columns="columns"
      :rows="data"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-x-sm">
          <u-filters-toolbar domain="genes" />

          <q-btn
            label="Oncogrid" icon="las la-chart-area" color="black" dense flat no-caps
            :to="{ name: 'oncogrid', params: { mode: 'genes', genes: rowsSelected }}"
            :disable="!data?.length">
          </q-btn>

          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'gene', params: { id: props.value.id.toString() }}">
            {{ props.value.id }}
          </router-link>
        </q-td>
      </template>

      <!-- <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'gene', params: { id: props.value.id.toString() }}">
            {{ props.value.symbol }}
          </router-link>
        </q-td>
      </template> -->
    </q-table>
  </div>
</template>

<script>
import UFiltersToolbar from "../../../_shared/components/filters/toolbar/FiltersToolbar.vue";
import tableMixin from "../../../_shared/table-mixin";

import Biotype from "../../../../_models/domain/genome/genes/enums/biotype";

export default {
  components: {
    UFiltersToolbar
  },
  
  mixins: [tableMixin],

  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: (row) => row,
          sortable: false,
          align: "left"
        },
        {
          name: "name",
          label: "Name",
          field: (row) => row.symbol,
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
    }
  }
}
</script>