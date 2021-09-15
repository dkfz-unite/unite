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
          from: 0,
          size: 10,
          term: null,
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      data: [],
      selected: [],
      filter: null,
      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0,
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
    }
  }
}

export default tableMixin;