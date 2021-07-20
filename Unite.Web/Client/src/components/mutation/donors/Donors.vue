<template>
  <div>
    <q-table
      title="Affected Donors"
      class="sticky-header-slim"
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
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'donor', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-treatments="props">
        <q-td :props="props">
          <div v-if="props.value && props.value.length">
            <div v-for="(treatment, i) in props.value" :key="i">
              {{ treatment.therapy }}
            </div>
          </div>
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
import contentHelpers from "@/services/helpers/helpers.content.js";


export default {
  props: ["rows", "rowsSelected", "rowsTotal", "filters", "loading"],

  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: (row) => row.id,
          sortable: false,
          required: true,
          align: "left",
        },
        {
          name: "mtaProtected",
          label: "MTA",
          field: (row) => contentHelpers.toBooleanString(row.mtaProtected),
          sortable: false,
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
          sortable: false,
        },
        {
          name: "diagnosis",
          label: "Diagnosis",
          field: (row) => row.clinicalData?.diagnosis,
          sortable: false,
          align: "left"
        },
        {
          name: "diagnosisDate",
          label: "Diagnosis Date",
          field: (row) => contentHelpers.toDateString(row.clinicalData?.diagnosisDate),
          sortable: false,
          align: "left"
        },
        {
          name: "treatments",
          label: "Treatments",
          field: (row) => row.treatments,
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

      data: [],

      selected: [],

      filter: null,

      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0,
      },
    };
  },

  watch: {
    rows(value) {
      this.data = value;
    },

    rowsTotal(value) {
      this.pagination.rowsNumber = value;
    },

    rowsSelected(value) {
      this.selected = value;
    },

    selected(value) {
      this.$emit("update:rowsSelected", value);
    },
  },

  mounted() {
    this.onRequest({ pagination: this.pagination, filter: this.filter });
  },

  methods: {
    onRequest(props) {
      let filters = {
        from: this.getFrom(props.pagination.page, props.pagination.rowsPerPage),
        size: this.getSize(props.pagination.rowsPerPage),
        term: props.filter,
      };

      this.pagination.page = props.pagination.page;
      this.pagination.rowsPerPage = props.pagination.rowsPerPage;

      this.$emit("update:filters", filters);
    },

    getFrom(page, pageSize) {
      if (page != null && page != undefined) {
        return (page - 1) * pageSize;
      } else {
        return 0;
      }
    },

    getSize(pageSize) {
      if (pageSize != null && pageSize != undefined) {
        return pageSize == 0 ? 10000 : pageSize;
      } else {
        return 20;
      }
    },
  },
}
</script>