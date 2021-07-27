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
          name: "mgmt",
          label: "MGMT",
          field: (row) => row.tissue?.molecularData?.mgmtStatus,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "idh",
          label: "IDH",
          field: (row) => this.getIdh(row.tissue?.molecularData?.idhStatus, row.tissue?.molecularData?.idhMutation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "geneExpressionSubtype",
          label: "Gene Expression Subtype",
          field: (row) => row.tissue?.molecularData?.geneExpressionSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "methylationSubtype",
          label: "Methylation Subtype",
          field: (row) => row.tissue?.molecularData?.methylationSubtype,
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "gCimpMethylation",
          label: "G-CIMP Methylation",
          field: (row) => contentHelpers.toBooleanString(row.tissue?.molecularData?.gcimpMethylation),
          sortable: false,
          align: "left",
          headerClasses: "bg-grey-2"
        },
        {
          name: "numberOfMutations",
          label: "#Mutations",
          field: (row) => row.numberOfMutations,
          sortable: false
        },
        {
          name: "numberOfGenes",
          label: "#Genes",
          field: (row) => row.numberOfGenes,
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
        return { name: "tissue", params: { id: specimen.id.toString() }}
      } else if (!!specimen.cellLine) {
        return { name: "cell", params: { id: specimen.id.toString() }}
      } else if (!!specimen.organoid) {
        return { name: "organoid", params: { id: specimen.id.toString() }}
      } else if (!!specimen.xenograft) {
        return { name: "xenograft", params: { id: specimen.id.toString() }}
      } else {
        return null;
      }
    },

    getSpecimenTypeName(specimen) {
      if (!specimen) {
        return null;
      } else if (!!specimen.tissue) {
        return `Tissue (${specimen.tissue.tumorType ?? specimen.tissue.type})`;
      } else if (!!specimen.cellLine) {
        return "Cell Line"
      } else if (!!specimen.organoid) {
        return "Organoid"
      } else if (!!specimen.xenograft) {
        return "Xenograft"
      } else {
        return null;
      }
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : idhStatus;
    }
  }
}
</script>