<template>
  <div>
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
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'mutation', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-consequences="props">
        <q-td :props="props">
          <u-consequences :consequences="props.value" />
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
import UConsequences from "../../../../../_shared/components/genome/mutations/cells/Consequences.vue";
import USpecimens from "../_shared/genome/Specimens.vue";
import tableMixin from "../../../../../_shared/table-mixin";

export default {
  components: {
    UConsequences,
    USpecimens
  },

  mixins: [tableMixin],

  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: (row) => row.id,
          sortable: false,
          required: true,
          align: "left"
        },
        {
          name: "code",
          label: "DNA change",
          field: (row) => row.code,
          sortable: false,
          align: "left"
        },
        {
          name: "type",
          label: "Type",
          field: (row) => row.type,
          sortable: false,
          align: "left"
        },
        {
          name: "consequences",
          label: "Consequences",
          field: row => row.transcriptConsequences,
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
        }
      ]
    };
  },

  methods: {
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