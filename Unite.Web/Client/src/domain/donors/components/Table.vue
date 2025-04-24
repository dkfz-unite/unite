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
      <template v-slot:header-left>
        <slot name="header-left">
        </slot>
      </template>

      <template v-slot:header-right>
        <slot name="header-right">
        </slot>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <u-link-donor :id="props.value" />
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
import UProjects from "./cells/Projects.vue";
import UStudies from "./cells/Studies.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";
import talbeCellsDataMixin from "@/domain/_shared/entries/components/table-cells-data-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable,
    UProjects,
    UStudies
  },

  mixins: [tableMixin, talbeCellsDataMixin],

  computed: {
    scope() {
      return Settings.domain;
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
        name: "referenceId",
        label: "External ID",
        field: (row) => row.referenceId,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "sex",
        label: "Sex",
        field: (row) => row.clinicalData?.sex,
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
        name: "steroidsReactive",
        label: "Steroids Reactive",
        field: (row) => this.$helpers.content.toBooleanString(row.clinicalData?.steroidsReactive),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "kps",
        label: "KPS",
        field: (row) => row.clinicalData?.kps?.toLocaleString(),
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

      if ([Settings.domain].includes(this.$route.name)){
        columns.push({
          name: "hasSms",
          label: "SM",
          field: (row) => this.dataView(row.data.sms),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.sms),
          headerClasses: this.dataHeaderClass()
        });

        columns.push({
          name: "hasCnvs",
          label: "CNV",
          field: (row) => this.dataView(row.data.cnvs),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.cnvs),
          headerClasses: this.dataHeaderClass()
        });

        columns.push({
          name: "hasSvs",
          label: "SV",
          field: (row) => this.dataView(row.data.svs),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.svs),
          headerClasses: this.dataHeaderClass()
        });

        columns.push({
          name: "hasMeth",
          label: "Meth",
          field: (row) => this.dataView(row.data.meth),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.meth),
          headerClasses: this.dataHeaderClass()
        });

        columns.push({
          name: "hasExp",
          label: "RNA",
          field: (row) => this.dataView(row.data.exp),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.exp),
          headerClasses: this.dataHeaderClass()
        });

        columns.push({
          name: "hasExpSc",
          label: "scRNA",
          field: (row) => this.dataView(row.data.expSc),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.expSc),
          headerClasses: this.dataHeaderClass()
        });
      }

      if (["donors", "cnvs", "svs"].includes(this.$route.name)){
        columns.push({
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.stats?.genes?.toLocaleString(),
          sortable: false
        });
      }

      if (["donors"].includes(this.$route.name)){
        columns.push({
          name: "numberOfSms",
          label: "#SMs",
          field: (row) => row.stats?.sms?.toLocaleString(),
          sortable: false
        });

        columns.push({
          name: "numberOfCnvs",
          label: "#CNVs",
          field: (row) => row.stats?.cnvs?.toLocaleString(),
          sortable: false
        });

        columns.push({
          name: "numberOfSvs",
          label: "#SVs",
          field: (row) => row.stats?.svs?.toLocaleString(),
          sortable: false
        }); 
      }

      return columns;
    }
  }
}
</script>