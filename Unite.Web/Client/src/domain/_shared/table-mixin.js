const tableMixin = {
    props: {
      title: {
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

      filters: {
        type: Object,
        default() {
          return {
            query: null,
            from: 0,
            size: 20
          }
        }
      },
      
      loading: {
        type: Boolean,
        default: false
      }
    },
  
    emits: [
      "update:rowsSelected", 
      "update:filters",
      "clear-criteria",
      "clear-selection"
    ],
  
    data() {
      return {
        data: this.rows || [],
        selected: this.rowsSelected || [],
        filter: this.filters?.query || null,
        pagination: {
          page: this.getPage(this.filters?.from, this.filters?.size),
          rowsPerPage: this.getPageSize(this.filters?.size),
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

      filters(value) {
        this.filter = value?.query;
        this.pagination.page = this.getPage(value?.from, value?.size);
        this.pagination.rowsPerPage = this.getSize(value?.size);
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
          return pageSize == 0 ? 10000 : pageSize;
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
          return size == 10000 ? 0 : size;
        } else {
          return 20;
        }
      }
    }
  }
  
  export default tableMixin;