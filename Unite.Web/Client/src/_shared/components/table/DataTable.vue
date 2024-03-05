<template>
  <q-table
    :title="title"
    :class="class" separator="cell" dense flat bordered selection="multiple" row-key="id"
    :visible-columns="visible"
    :columns="columns"
    :rows="data" 
    v-model:selected="selected"
    v-model:pagination="pagination"
    v-bind:rows-per-page-options="paginationOptions" 
    v-bind:loading="loading"
    @request="onRequest">
    <template v-slot:top-right>
      <div class="row items-center q-gutter-x-sm">
        <slot name="header-right" />
        <u-columns-picker v-model="visible" :columns="columns" />
      </div>
    </template>
    <template v-for="(_, name) in $slots" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </q-table>
</template>

<script>
import UColumnsPicker from "./header/ColumnsPicker.vue";
export default {
  components: {
    UColumnsPicker
  },

  props: {
    scope: {
      type: String,
      required: true
    },
    
    title: {
      type: String,
      default: null
    },

    columns: {
      type: Array,
      default() {
        return [];
      }
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

    from: {
      type: Number,
      default: 1
    },

    size: {
      type: Number,
      default: 20
    },

    loading: {
      type: Boolean,
      default: false
    },

    class: {
      type: String,
      default: null
    }
  },

  emits: [
    "update",
    "update:from",
    "update:size",
    "update:rowsSelected"
  ],

  data() {
    return {
      data: this.rows || [],
      visible: this.loadColumns(),
      selected: this.rowsSelected || [],
      paginationOptions: [20, 50, 70, 100, 150, 200, 250, 500],
      pagination: {
        page: this.getPage(this.from, this.size),
        rowsPerPage: this.getPageSize(this.size),
        rowsNumber: this.rowsTotal || 0,
      }
    }
  },

  watch: {
    // In
    rows(value) {
      this.data = value;
    },

    rowsSelected(value) {
      this.selected = value;
    },

    rowsTotal(value) {
      this.pagination.rowsNumber = value;
    },

    from(value) {
      this.pagination.page = this.getPage(value, this.size);
    },

    size(value) {
      this.pagination.rowsPerPage = this.getSize(value);
    },

    // Out
    selected(value) {
      const payload = value;
      this.$emit("update:rowsSelected", payload);
    },

    visible(value) {
      this.saveColumns(value);
    }
  },

  methods: {
    onRequest(props) {
      const { page, rowsPerPage } = props.pagination;

      if(this.pagination.page != page) {
        this.pagination.page = page;
        const from = this.getFrom(this.pagination.page, this.pagination.rowsPerPage);
        this.$emit("update:from", from);
      }
      if(this.pagination.rowsPerPage != rowsPerPage) {
        this.pagination.rowsPerPage = rowsPerPage;
        const size = this.getSize(this.pagination.rowsPerPage);
        this.$emit("update:size", size);
      }
      
      this.$emit("update");
    },

    getColumnsKey() {
      const identity = this.$store.state.identity.account?.email || "anonymous";
      const scope = `${this.scope}`;
      return `${identity}-columns-${scope}`;
      // const domain = this.$route.params?.tab ? `${this.$route.name}_${this.$route.params.tab}` : this.$route.name;
      // return `${identity}-columns-${domain}`;
    },

    loadColumns() {
      const json = localStorage.getItem(this.getColumnsKey());
      return json ? JSON.parse(json) : this.columns.filter(column => column.show == false ? false : true).map(column => column.name);
    },

    saveColumns(value) {
      const json = JSON.stringify(value);
      localStorage.setItem(this.getColumnsKey(), json);
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