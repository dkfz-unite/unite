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
          <u-specimen-link :id="props.value" type="xenograft" />
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
      return "xenografts";
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
        name: "mouseStrain",
        label: "Mouse Strain",
        field: (row) => row.xenograft?.mouseStrain,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "groupSize",
        label: "Group Size",
        field: (row) => row.xenograft?.groupSize,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorigenicity",
        label: "Tumorigenicity",
        field: (row) => this.$helpers.content.toBooleanString(row.xenograft?.tumorigenicity),
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "tumorGrowthForm",
        label: "Tumor Growth Form",
        field: (row) => row.xenograft?.tumorGrowthForm,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "survivalDays",
        label: "Survival Days",
        field: (row) => row.xenograft?.survivalDays,
        sortable: false,
        align: "left"
      });

      columns.push({
        name: "mgmt",
        label: "MGMT",
        field: (row) => row.xenograft?.molecularData?.mgmtStatus,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "idh",
        label: "IDH",
        field: (row) => this.getIdh(row.xenograft?.molecularData?.idhStatus, row.xenograft?.molecularData?.idhMutation),
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "geneExpressionSubtype",
        label: "Gene Expression Subtype",
        field: (row) => row.xenograft?.molecularData?.geneExpressionSubtype,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "methylationSubtype",
        label: "Methylation Subtype",
        field: (row) => row.xenograft?.molecularData?.methylationSubtype,
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "gCimpMethylation",
        label: "G-CIMP Methylation",
        field: (row) => this.$helpers.content.toBooleanString(row.xenograft?.molecularData?.gcimpMethylation),
        sortable: false,
        align: "left",
        headerClasses: "bg-grey-2"
      });

      columns.push({
        name: "numberOfGenes",
        label: "#Genes",
        field: (row) => row.numberOfGenes,
        sortable: false
      });

      columns.push({
        name: "numberOfSsms",
        label: "#SSMs",
        field: (row) => row.numberOfMutations,
        sortable: false
      });

      columns.push({
        name: "numberOfCnvs",
        label: "#CNVs",
        field: (row) => row.numberOfCopyNumberVariants,
        sortable: false
      });

      columns.push({
        name: "numberOfSVs",
        label: "#SVs",
        field: (row) => row.numberOfStructuralVariants,
        sortable: false
      });

      return columns;
    }
  }
}
</script>