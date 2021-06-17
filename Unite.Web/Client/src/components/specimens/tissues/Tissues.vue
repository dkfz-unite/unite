<template>
  <div class="col">
    <q-table
      title="Tissues"
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
        <q-input v-model="filter" placeholder="Search" dense debounce="300" style="width: 300px">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <router-link class="u-link" :to="{ name: 'tissue', params: { id: props.value.toString() }}">
            {{ props.value }}
          </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-donor="props">
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
          align: "left"
        },
        // {
        //   name: "donor",
        //   label: "Donor ID",
        //   field: (row) => row.donorId,
        //   sortable: false,
        //   align: "left"
        // },
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
        // {
        //   name: "children",
        //   label: "#Children",
        //   field: (row) => row.children?.length,
        //   sortable: false,
        //   align: "left"
        // },
        {
          name: "type",
          label: "Type",
          field: (row) => row.tissue?.tumorType ?? row.tissue?.type,
          sortable: false,
          align: "left"
        },
        {
          name: "source",
          label: "Source",
          field: (row) => row.tissue?.source,
          sortable: false,
          align: "left"
        },
        {
          name: "geneExpressionType",
          label: "Gene Expression Type",
          field: (row) => row.molecularData?.geneExpressionSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "idh",
          label: "IDH",
          field: (row) => this.getIdh(row.molecularData?.idhStatus, row.molecularData?.idhMutation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "mgmt",
          label: "MGMT",
          field: (row) => this.getMgmt(row.molecularData?.methylationStatus, row.molecularData?.methylationType),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "gCimpMethylation",
          label: "G-CIMP Methylation",
          field: (row) => contentHelpers.toBooleanString(row.molecularData?.gcimpMethylation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
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

    getSpecimenLink(specimen) {
      if (!specimen) {
        return null;
      } else if (!!specimen.tissue) {
        return {to: "tissue", params: { id: specimen.id.toString() }}
      } else if (!!specimen.cellLine) {
        return {to: "cell", params: { id: specimen.id.toString() }}
      } else if (!!specimen.xenograft) {
        return {to: "xenograft", params: { id: specimen.id.toString() }}
      } else {
        return null;
      }
    },

    getSpecimenTypeName(specimen) {
      if (!specimen) {
        return null;
      } else if (!!specimen.tissue) {
        return this.getTissueTypeName(specimen.tissue);
      } else if (!!specimen.cellLine) {
        return "Cell Line"
      } else if (!!specimen.xenograft) {
        return "Xenograft"
      } else {
        return null;
      }
    },

    getTissueTypeName(tissue) {
      if (!tissue.type) {
        return "Tissue";
      } else if(!tissue.tumorType) {
        return `Tissue (${tissue.type})`;
      } else {
        return `Tissue (${tissue.tumorType} ${tissue.type})`; 
      }
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : idhStatus;
    },

    getMgmt(methylationStatus, methylationType) {
      return !!methylationType ? methylationType : methylationStatus;
    }
  }
}
</script>