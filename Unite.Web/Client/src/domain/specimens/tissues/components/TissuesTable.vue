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
          <u-specimen-link :id="props.value" type="tissue" />
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <u-donor-link :id="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-parentId="props">
        <q-td :props="props">
          <u-specimen-link v-if="props.value" :id="props.value.id" :type="getSpecimenType(props.value)" />
        </q-td>
      </template>
    </u-data-table>
  </div>
</template>

<script>
import UDataTable from "@/_shared/components/table/DataTable.vue";
import UDonorLink from "@/_shared/components/DonorLink.vue";
import USpecimenLink from "@/_shared/components/SpecimenLink.vue";
import tableMixin from "../../../_shared/table-mixin";
import specimensTableMixin from "../../_shared/specimens-table-mixin";

export default {
  components: {
    UDataTable,
    UDonorLink,
    USpecimenLink
  },

  mixins: [tableMixin, specimensTableMixin],

  computed: {
    scope() {
      return "tissues";
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
        field: (row) => row.parent,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "parentType",
        label: "Parent Type",
        field: (row) => this.getSpecimenTypeName(row.parent),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "type",
        label: "Type",
        field: (row) => row.tissue?.tumorType ?? row.tissue?.type,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "source",
        label: "Source",
        field: (row) => row.tissue?.source,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "mgmt",
        label: "MGMT",
        field: (row) => row.tissue?.molecularData?.mgmtStatus,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "idh",
        label: "IDH",
        field: (row) => this.getIdh(row.tissue?.molecularData?.idhStatus, row.tissue?.molecularData?.idhMutation),
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "geneExpressionSubtype",
        label: "Gene Expression Subtype",
        field: (row) => row.tissue?.molecularData?.geneExpressionSubtype,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "methylationSubtype",
        label: "Methylation Subtype",
        field: (row) => row.tissue?.molecularData?.methylationSubtype,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "gCimpMethylation",
        label: "G-CIMP Methylation",
        field: (row) => this.$helpers.content.toBooleanString(row.tissue?.molecularData?.gcimpMethylation),
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.numberOfGenes?.toLocaleString(),
        sortable: false
      });

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
        name: "numberOfSVs",
        label: "#SVs",
        field: (row) => row.numberOfStructuralVariants?.toLocaleString(),
        sortable: false
      });

      return columns;
    }
  }
}
</script>