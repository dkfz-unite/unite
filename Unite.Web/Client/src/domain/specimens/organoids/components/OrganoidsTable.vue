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
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-x-sm">
          <u-filters-toolbar domain="organoids" />

          <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'organoid', params: { id: props.value.toString() }}">
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
          name: "implantedCells",
          label: "#Implanted Cells",
          field: (row) => row.organoid?.implantedCellsNumber,
          sortable: false,
          align: "left"
        },
        {
          name: "medium",
          label: "Medium",
          field: (row) => row.organoid?.medium,
          sortable: false,
          align: "left"
        },
        {
          name: "tumorigenicity",
          label: "Tumorigenicity",
          field: (row) => this.$helpers.content.toBooleanString(row.organoid?.tumorigenicity),
          sortable: false,
          align: "left"
        },
        {
          name: "mgmt",
          label: "MGMT",
          field: (row) => row.organoid?.molecularData?.mgmtStatus,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "idh",
          label: "IDH",
          field: (row) => this.getIdh(row.organoid?.molecularData?.idhStatus, row.organoid?.molecularData?.idhMutation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "geneExpressionSubtype",
          label: "Gene Expression Subtype",
          field: (row) => row.organoid?.molecularData?.geneExpressionSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "methylationSubtype",
          label: "Methylation Subtype",
          field: (row) => row.organoid?.molecularData?.methylationSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "gCimpMethylation",
          label: "G-CIMP Methylation",
          field: (row) => this.$helpers.content.toBooleanString(row.organoid?.molecularData?.gcimpMethylation),
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