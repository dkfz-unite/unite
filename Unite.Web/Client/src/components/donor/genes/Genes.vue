<template>
  <div class="col">
    <q-table
      class="sticky-header-slim"
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

      <template v-slot:body-cell-specimens="props">
        <q-td :props="props">
          <u-specimens :specimens="props.value" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import USpecimens from "../_common/cells/Specimens.vue";
import Biotype from "../../../services/criteria/filters/data/mutations/filter.option.biotype.js";
import tableMixin from "../../_common/_mixins/mixin.table.js";

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
    }
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
        }
      }
    }
  },

  components: {
    USpecimens: USpecimens
  }
}
</script>