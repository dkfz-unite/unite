<template>
  <div class="col">
    <q-table
      title="Donors"
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
        <div class="row q-gutter-x-md">
          <q-btn
            label="Oncogrid" icon="las la-chart-area" color="primary" dense flat no-caps
            :to="{ name: 'oncogrid', params: { mode: 'donors', donors: rowsSelected }}" 
          />
          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'donor', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-packages="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(workPackage, i) in props.value" :key="i">
              {{ workPackage.name }}
            </div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-studies="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(study, i) in props.value" :key="i">
              {{ study.name }}
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import contentHelpers from "../../services/helpers/helpers.content.js";
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
          name: "gender",
          label: "Gender",
          field: (row) => row.clinicalData?.gender,
          sortable: false,
          align: "left"
        },
        {
          name: "age",
          label: "Age",
          field: (row) => row.clinicalData?.age,
          sortable: false
        },
        {
          name: "primarySite",
          label: "Primary Site",
          field: (row) => row.clinicalData?.primarySite,
          sortable: false,
          align: "left"
        },
        {
          name: "diagnosis",
          label: "Diagnosis",
          field: (row) => row.clinicalData?.diagnosis,
          sortable: false,
          align: "left"
        },
        {
          name: "mtaProtected",
          label: "MTA",
          field: (row) => contentHelpers.toBooleanString(row.mtaProtected),
          sortable: false,
          align: "left"
        },
        {
          name: "packages",
          label: "Work Packages",
          field: (row) => row.workPackages,
          sortable: false,
          align: "left"
        },
        {
          name: "studies",
          label: "Studies",
          field: (row) => row.studies,
          sortable: false,
          align: "left"
        },
        {
          name: "numberOfSpecimens",
          label: "#Specimens",
          field: (row) => row.numberOfSpecimens,
          sortable: false
        },
        {
          name: "numberOfMutations",
          label: "#Mutations",
          field: (row) => row.numberOfMutations,
          sortable: false
        },
        {
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes,
          sortable: false
        }
      ],
    }
  }
}
</script>