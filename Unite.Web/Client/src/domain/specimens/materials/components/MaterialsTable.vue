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
          <u-link-material :id="props.value" />
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

import Settings from "../settings";
import tableMixin from "../../../_shared/table-mixin";
import availableDataMixin from "../../../_shared/available-data-mixin";
import specimensTableMixin from "../../_shared/specimens-table-mixin";

export default {
  components: {
    UDataTable
  },

  mixins: [tableMixin, availableDataMixin, specimensTableMixin],

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
        name: "donorId",
        label: "Donor Id",
        field: (row) => row.donorId,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "parentId",
        label: "Parent ID",
        field: (row) => row,
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "parentType",
        label: "Parent Type",
        field: (row) => this.getSpecimenTypeName(row.parentType),
        sortable: false,
        align: "left",
        show: false
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.material?.tumorType ?? row.material?.type,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "source",
        label: "Source",
        field: (row) => row.material?.source,
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
          name: "hasSsms",
          label: "SSM",
          field: (row) => this.dataView(row.data.ssms),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.ssms),
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
          name: "hasGeneExp",
          label: "RNA",
          field: (row) => this.dataView(row.data.geneExp),
          sortable: false,
          align: "center",
          classes: (row) => this.dataCellClass(row.data.geneExp),
          headerClasses: this.dataHeaderClass()
        });
      }

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.numberOfGenes?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfSsms",
        label: "#SSMs",
        field: (row) => row.numberOfSsms?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfCnvs",
        label: "#CNVs",
        field: (row) => row.numberOfCnvs?.toLocaleString(),
        sortable: false
      });

      columns.push({
        name: "numberOfSVs",
        label: "#SVs",
        field: (row) => row.numberOfSvs?.toLocaleString(),
        sortable: false
      });

      return columns;
    }
  }
}
</script>