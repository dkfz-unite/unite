<template>
  <div class="col">
    <q-table
      title="Mutations"
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
          <router-link class="u-link" :to="{ name: 'mutation', params: { id: props.value.toString() }}">
            {{ props.value }}
        </router-link>
        </q-td>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <template v-if="props.value">
            <a class="u-link" :href="'https://www.ncbi.nlm.nih.gov/snp/' + props.value" target="blank">
                {{ props.value }}
            </a>
          </template>
        </q-td>
      </template>

      <template v-slot:body-cell-gene="props">
        <q-td :props="props">
          <template v-if="props.value">
            <a class="u-link" :href="'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' + props.value.name" target="blank">
                {{ props.value.name }}
            </a>
          </template>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
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
          name: "code",
          label: "DNA change",
          field: (row) => row.code,
          sortable: false
        },
        { 
            name: "type", 
            label: "Type", 
            field: row => row.type, 
            sortable: false
        },
        // {
        //   name: "gene",
        //   label: "Gene",
        //   field: (row) => row.gene,
        //   sortable: false
        // },
        {
          name: "donors",
          label: "Donors affected",
          field: (row) => row.donors,
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
    this.$route.params.tab = "mutation";
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
  },
};
</script>