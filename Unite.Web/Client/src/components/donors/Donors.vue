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
        <div class="q-pa-md q-gutter-sm">
          <router-link class="u-link"
                       :to="{ name: 'oncogrid', params: { selectedDonors: rowsSelected, preselectFilters: true }}">
            <i class="las la-chart-area" :disable="!showDonors"/>
          </router-link>
        </div>
        <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>

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
import apiClient from "@/services/api/api.client.identity";

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
          align: "left"
        },
        {
          name: "origin",
          label: "Origin",
          field: (row) => row.origin,
          sortable: false,
          align: "left"
        },
        {
          name: "mtaProtected",
          label: "MTA",
          field: (row) => this.toBooleanString(row.mtaProtected),
          sortable: false,
          align: "left"
        },
        {
          name: "diagnosis",
          label: "Diagnosis",
          field: (row) => row.diagnosis,
          sortable: false,
          align: "left"
        },
        {
          name: "diagnosisDate",
          label: "Diagnosis Date",
          field: (row) => this.getDate(row.diagnosisDate),
          sortable: false
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
          name: "idh",
          label: "IDH",
          field: (row) =>
              this.getIdh(
                  row.epigeneticsData?.idhStatus,
                  row.epigeneticsData?.idhMutation
              ),
          sortable: false,
          align: "left"
        },
        {
          name: "mgmt",
          label: "MGMT",
          field: (row) =>
              this.getMgmt(
                  row.epigeneticsData?.methylationStatus,
                  row.epigeneticsData?.methylationSubtype
              ),
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
          name: "mutations",
          label: "#Mutations",
          field: (row) => row.mutations,
          sortable: false
        },
        {
          name: "genes",
          label: "#Genes",
          field: (row) => row.genes,
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

  computed: {
    showDonors() {
      return !!this.data;
    }
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
    this.onRequest({pagination: this.pagination, filter: this.filter});
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

    getDate(dateString) {
      if (!dateString) {
        return null;
      }

      var date = new Date(dateString);

      return date.toLocaleDateString();
    },

    toBooleanString(value) {
      if (!value) {
        return null;
      }

      return value ? "Yes" : "No";
    },

    getIdh(idhStatus, idhMutation) {
      return idhMutation ?? idhStatus;
    },

    getMgmt(methylationStatus, methylationSubtype) {
      return methylationSubtype ?? methylationStatus;
    }
  },
};
</script>