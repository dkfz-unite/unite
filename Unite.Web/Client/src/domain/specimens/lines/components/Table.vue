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
          <u-link-line :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <u-link-donor :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-parentId="props">
        <q-td :props="props">
          <u-link-specimen v-if="props.value.parentId" :id="props.value.parentId" :type="props.value.parentType" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import tableMixin from "@/domain/_shared/entries/components/table-mixin";
import tableCellsDataMixin from "@/domain/_shared/entries/components/table-cells-data-mixin";
import tableCellsSpecimenMixin from "../../_shared/specimens/components/cells-mixin";

import Settings from "../settings";

export default {
  components: {
    UDataTable
  },

  mixins: [tableMixin, tableCellsDataMixin, tableCellsSpecimenMixin],   

  computed: {
    scope() {
      return "lines";
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
        name: "donorId",
        label: "Donor ID",
        field: (row) => row.donorId,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "parentId",
        label: "Parent ID",
        field: (row) => row,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "parentType",
        label: "Parent Type",
        field: (row) => this.getSpecimenTypeName(row.parentType),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "species",
        label: "Species",
        field: (row) => row.line?.cellsSpecies,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.line?.cellsType,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "cultureType",
        label: "Culture Type",
        field: (row) => row.line?.cellsCultureType,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "mgmt",
        label: "MGMT",
        field: (row) => row.molecularData?.mgmtStatus,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "idh",
        label: "IDH",
        field: (row) => this.getIdh(row.molecularData?.idhStatus, row.molecularData?.idhMutation),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "geneExpressionSubtype",
        label: "Gene Expression Subtype",
        field: (row) => row.molecularData?.geneExpressionSubtype,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "methylationSubtype",
        label: "Methylation Subtype",
        field: (row) => row.molecularData?.methylationSubtype,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "gCimpMethylation",
        label: "G-CIMP Methylation",
        field: (row) => this.$helpers.content.toBooleanString(row.molecularData?.gcimpMethylation),
        sortable: false,
        align: "left",
        show: false
      });

      if ([Settings.domain].includes(this.$route.name)){
        columns.push({
          name: "hasDrugs",
          label: "Drugs",
          field: (row) => this.dataView(row.data.drugs),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.drugs),
          headerClasses: this.dataHeaderClass()
        });

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

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.stats?.genes?.toLocaleString(),
        sortable: false
      });

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
        name: "numberOfSVs",
        label: "#SVs",
        field: (row) => row.stats?.svs?.toLocaleString(),
        sortable: false
      });

      return columns;
    }
  }
};
</script>