<template>
  <div class="col">
    <q-table
      title="Mutations"
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :columns="columns"
      :data="data"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

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
    </q-table>
  </div>
</template>

<script>
import UConsequences from "../_common/mutations/cells/Consequences.vue";
import tableMixin from "../_common/_mixins/mixin.table.js";

export default {
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
            field: row => row.type, 
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
          name: "numberOfDonors",
          label: "#Affected Donors",
          field: (row) => row.numberOfDonors,
          sortable: false
        }
      ],
    }
  },

  components: {
    UConsequences: UConsequences
  }
}
</script>