<template>
  <q-table 
    :title="title"
    :class="class" separator="cell" dense flat bordered selection="multiple" row-key="id"
    :columns="columns"
    :rows="data" 
    v-model:selected="selected"
    v-bind:pagination="pagination"
    v-bind:rows-per-page-options="paginationOptions" 
    v-bind:loading="loading" 
    @request="onRequest">
  </q-table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },

    class: {
      type: String,
      default: null
    },

    rows: {
      type: Array,
      default() {
        return [];
      }
    },

    rowsSelected: {
      type: Array,
      default() {
        return [];
      }
    },

    rowsTotal: {
      type: Number,
      default: 0
    },

    page: {
      type: Number,
      default: 1
    },

    pageSize: {
      type: Number,
      default: 20
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: [
    "update:rowsSelected",
    "update:page",
    "update:pageSize",
    // "update:filters",
    // "clear-criteria",
    // "clear-selection"
  ],

  data() {
    return {
      data: this.rows || [],
      selected: this.rowsSelected || [],
      paginationOptions: [20, 50, 70, 100, 150, 200, 250, 500],
      pagination: {
        page: this.getPage(this.page, this.pageSize),
        rowsPerPage: this.getPageSize(this.pageSize),
        rowsNumber: this.rowsTotal || 0,
      }
    }
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

    page(value) {
      this.pagination.page = this.getPage(value, this.pagination.rowsPerPage);
    },

    pageSize(value) {
      this.pagination.rowsPerPage = this.getSize(value);
    },

    selected(value) {
      this.$emit("update:rowsSelected", value);
    }
  },

  methods: {
    onRequest(props) {
      const { page, rowsPerPage } = props.pagination;
      const { filter } = props;

      if (page == this.pagination.page && rowsPerPage == this.pagination.rowsPerPage) {
        this.selected = [];
        this.pagination.page = 1;
        this.pagination.rowsPerPage = rowsPerPage;
        const from = this.getFrom(this.pagination.page, this.pagination.rowsPerPage);
        const size = this.getSize(this.pagination.rowsPerPage);
        const query = filter;
        this.$emit("update:rowsSelected", []);
        this.$emit("update:filters", { query, from, size });
      } else {
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        const from = this.getFrom(this.pagination.page, this.pagination.rowsPerPage);
        const size = this.getSize(this.pagination.rowsPerPage);
        const query = filter;
        this.$emit("update:filters", { query, from, size });
      }
    },

    getFrom(page, pageSize) {
      if (page != null && pageSize != null) {
        return (page - 1) * pageSize;
      } else {
        return 0;
      }
    },

    getSize(pageSize) {
      if (pageSize != null) {
        return pageSize;
      } else {
        return 20;
      }
    },

    getPage(from, size) {
      if (from != null && size != null) {
        return from / size + 1;
      } else {
        return 1;
      }
    },

    getPageSize(size) {
      if (size != null) {
        return size;
      } else {
        return 20;
      }
    }
  }
}
</script>