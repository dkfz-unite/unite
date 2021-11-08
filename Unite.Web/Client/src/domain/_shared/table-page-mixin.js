const mixin = {
  data() {
    return {
      loading: false,
      rows: [],
      rowsTotal: 0
    };
  },

  computed: {
    domain() {
      // Should be implemented in component
      throw "Property 'domain:String' should be implemented in component"
    },

    filtersCriteria: {
      get() { return this.domain.filtersCriteria },
      set(value) { this.domain.filtersCriteria = value }
    },

    filtersContext: {
      get() { return this.domain.filtersContext },
      set(value) { this.domain.filtersContext = value }
    },

    rowsSelected: {
      get() { return this.domain.selected },
      set(value) { this.domain.selected = value }
    },
  },

  watch: {
    filtersCriteria(value) {
      this.loadData();
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async filterData() {
      this.rowsSelected = [];
      this.loadData();
    },

    async loadData() {
      try {
        this.loading = true;
        let data = await this.fetchData(this.filtersCriteria.toSearchCriteria());
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
      } catch (error) {
        this.rows = [];
        this.rowsTotal = 0;
      } finally {
        this.loading = false;
      }
    },

    async fetchData(searchCriteria) {
      // Should be implemented in component
      throw "Method 'async fetchData(searchCriteria)' should be implemented in component";
    }
  }
};

export default mixin;