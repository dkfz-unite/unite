<template>
  <div class="col">
    <u-data-table
      :class="class"
      :title="title"
      :loading="loading"
      :scope="scope"
      :columns="columns"
      :rows="rows"
      :rows-total="rowsTotal"
      v-model:rows-selected="dataSelected"
      v-model:from="dataFrom"
      v-model:size="dataSize">
      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <u-donor-link :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-projects="props">
        <q-td :props="props">
          <u-projects :projects="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-studies="props">
        <q-td :props="props">
          <u-studies :studies="props.value" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UDonorLink from "@/_shared/components/DonorLink.vue";
import UProjects from "./cells/Projects.vue";
import UStudies from "./cells/Studies.vue";
import tableMixin from "../../table-mixin";

export default {
  components: {
    UDataTable,
    UDonorLink,
    UProjects,
    UStudies
  },

  mixins: [tableMixin],

  computed: {
    scope() {
      return "donors";
    },
    columns() {
      let columns = [];

      columns.push({
        name: "id",
        label: "ID",
        field: (row) => row.id,
        sortable: false,
        required: true,
        align: "left"
      });

      columns.push({
        name: "gender",
        label: "Sex",
        field: (row) => row.clinicalData?.gender,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "age",
        label: "Age",
        field: (row) => row.clinicalData?.age,
        sortable: false
      });

      columns.push({
        name: "primarySite",
        label: "Primary Site",
        field: (row) => row.clinicalData?.primarySite,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "diagnosis",
        label: "Diagnosis",
        field: (row) => row.clinicalData?.diagnosis,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "vitalStatus",
        label: "Alive",
        field: (row) => this.$helpers.content.toBooleanString(row.clinicalData?.vitalStatus),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "vitalStatusChangeDay",
        label: "Survival (Days)",
        field: (row) => row.clinicalData?.vitalStatusChangeDay?.toLocaleString(),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "progressionStatus",
        label: "Progression",
        field: (row) => this.$helpers.content.toBooleanString(row.clinicalData?.progressionStatus),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "progressionStatusChangeDay",
        label: "PFS (Days)",
        field: (row) => row.clinicalData?.progressionStatusChangeDay?.toLocaleString(),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "kpsBaseline",
        label: "KPS Baseline",
        field: (row) => row.clinicalData?.kpsBaseline?.toLocaleString(),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "steroidsBaseline",
        label: "Steroids Baseline",
        field: (row) => row.clinicalData?.steroidsBaseline?.toLocaleString(),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "mtaProtected",
        label: "MTA",
        field: (row) => this.$helpers.content.toBooleanString(row.mtaProtected),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "projects",
        label: "Projects",
        field: (row) => row.projects,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "studies",
        label: "Studies",
        field: (row) => row.studies,
        sortable: false,
        align: "left"
      });

      if (!["gene"].includes(this.$route.name)){
        columns.push({
          name: "numberOfImages",
          label: "#Images",
          field: (row) => row.numberOfImages?.toLocaleString(),
          sortable: false
        });
      }

      if (!["gene"].includes(this.$route.name)) {
        columns.push({
          name: "numberOfSpecimens",
          label: "#Specimens",
          field: (row) => row.numberOfSpecimens?.toLocaleString(),
          sortable: false
        });
      }

      if (!["gene"].includes(this.$route.name)) {
        columns.push({
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes?.toLocaleString(),
          sortable: false
        }); 
      }

      columns.push({
        name: "numberOfSsms",
        label: "#SSMs",
        field: (row) => row.numberOfMutations?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfCnvs",
        label: "#CNVs",
        field: (row) => row.numberOfCopyNumberVariants?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfSvs",
        label: "#SVs",
        field: (row) => row.numberOfStructuralVariants?.toLocaleString(),
        sortable: false
      });

      return columns;
    }
  }
}
</script>