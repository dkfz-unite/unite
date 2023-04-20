const mixin = {
  data() {
    return {
      loading: false,
      // rows: [],
      // rowsTotal: 0
    };
  },

  computed: {
    /**
     * Store module to use as base.
     * Should be implemented in component.
     * @returns Given domain store module.
     */
    domain() {
      // Should be implemented in component
      throw "Property 'domain' (this.$store.state[domain]) should be implemented in component";
    },

    filtersCriteria: {
      get() { return this.domain.filtersCriteria },
      set(value) { this.domain.filtersCriteria = value }
    },

    filtersContext: {
      get() { return this.domain.filtersContext },
      set(value) { this.domain.filtersContext = value }
    },

    rows: {
      get() { return this.domain.rows; },
      set(value) { this.domain.rows = value; }
    },

    rowsTotal: {
      get() { return this.domain.rowsTotal; },
      set(value) { this.domain.rowsTotal = value; }
    },

    rowsSelected: {
      get() { return this.domain.rowsSelected; },
      set(value) { this.domain.rowsSelected = value; }
    }
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
      this.filtersCriteria?.sanitise();
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