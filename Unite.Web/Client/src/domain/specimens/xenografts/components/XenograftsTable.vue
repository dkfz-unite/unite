<template>
  <div class="col">
    <q-table
      class="sticky-header"
      separator="cell" dense flat bordered
      selection="multiple"
      row-key="id"
      :title="title"
      :columns="columns"
      :rows="data"
      v-model:selected="selected"
      v-model:pagination="pagination"
      :rows-per-page-options="pageOptions"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-x-sm">
          <u-filters-toolbar domain="xenografts" />

          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'xenograft', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-donorId="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'donor', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-parentId="props">
        <q-td :props="props">
          <router-link v-if="props.value" class="u-link" :to="getSpecimenLink(props.value)">
            {{ props.value.id }}
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import UFiltersToolbar from "../../../_shared/components/filters/toolbar/FiltersToolbar.vue";
import tableMixin from "../../../_shared/table-mixin";
import specimensTableMixin from "../../_shared/specimens-table-mixin";

export default {
  components: {
    UFiltersToolbar
  },

  mixins: [tableMixin, specimensTableMixin],

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
          name: "donorId",
          label: "Donor Id",
          field: (row) => row.donorId,
          sortable: false,
          align: "left"
        },
        {
          name: "parentId",
          label: "Parent ID",
          field: (row) => row.parent,
          sortable: false,
          align: "left"
        },
        {
          name: "parentType",
          label: "Parent Type",
          field: (row) => this.getSpecimenTypeName(row.parent),
          sortable: false,
          align: "left"
        },
        {
          name: "mouseStrain",
          label: "Mouse Strain",
          field: (row) => row.xenograft?.mouseStrain,
          sortable: false,
          align: "left"
        },
        {
          name: "groupSize",
          label: "Group Size",
          field: (row) => row.xenograft?.groupSize,
          sortable: false,
          align: "left"
        },
        {
          name: "tumorigenicity",
          label: "Tumorigenicity",
          field: (row) => this.$helpers.content.toBooleanString(row.xenograft?.tumorigenicity),
          sortable: false,
          align: "left"
        },
        {
          name: "tumorGrowthForm",
          label: "Tumor Growth Form",
          field: (row) => row.xenograft?.tumorGrowthForm,
          sortable: false,
          align: "left"
        },
        {
          name: "survivalDays",
          label: "Survival Days",
          field: (row) => row.xenograft?.survivalDays,
          sortable: false,
          align: "left"
        },
        {
          name: "mgmt",
          label: "MGMT",
          field: (row) => row.xenograft?.molecularData?.mgmtStatus,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "idh",
          label: "IDH",
          field: (row) => this.getIdh(row.xenograft?.molecularData?.idhStatus, row.xenograft?.molecularData?.idhMutation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "geneExpressionSubtype",
          label: "Gene Expression Subtype",
          field: (row) => row.xenograft?.molecularData?.geneExpressionSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "methylationSubtype",
          label: "Methylation Subtype",
          field: (row) => row.xenograft?.molecularData?.methylationSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "gCimpMethylation",
          label: "G-CIMP Methylation",
          field: (row) => this.$helpers.content.toBooleanString(row.xenograft?.molecularData?.gcimpMethylation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes,
          sortable: false
        },
        {
          name: "numberOfSsms",
          label: "#SSMs",
          field: (row) => row.numberOfMutations,
          sortable: false
        },
        {
          name: "numberOfCnvs",
          label: "#CNVs",
          field: (row) => row.numberOfCopyNumberVariants,
          sortable: false
        },
        {
          name: "numberOfSVs",
          label: "#SVs",
          field: (row) => row.numberOfStructuralVariants,
          sortable: false
        }
      ]
    };
  }
}
</script>