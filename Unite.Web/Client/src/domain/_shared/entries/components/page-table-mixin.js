const mixin = {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    state() {
      if (typeof(this.domain) === "string") {
        return this.$store.state[this.domain];
      } else if (typeof(this.domain) === "object") {
        return this.domain;
      } else {
        throw "Property 'domain' should be a string or an object";
      }
    },

    account() {
      return this.$store.state.identity.account?.email;
    },

    filtersCriteria: {
      get() { return this.state.filtersCriteria },
      set(value) { this.state.filtersCriteria = value }
    },

    filtersContext: {
      get() { return this.state.filtersContext },
      set(value) { this.state.filtersContext = value }
    },

    rows: {
      get() { return this.state.rows; },
      set(value) { this.state.rows = value; }
    },

    rowsTotal: {
      get() { return this.state.rowsTotal; },
      set(value) { this.state.rowsTotal = value; }
    },

    rowsSelected: {
      get() { return this.state.rowsSelected; },
      set(value) { this.state.rowsSelected = value; }
    }
  },

  watch: {
    filtersCriteria(value) {
      this.loadData();
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async updateFrom() {
      this.loadData();
    },

    async updateSize() {
      if (this.filtersCriteria.from !== 0) {
        // Reseting page will call 'loadData'
        this.filtersCriteria?.resetPage();
      } else {
        // Calling 'loadData' directly
        this.loadData();
      }
    },

    async updateFilters() {
      if (this.filtersCriteria.from !== 0) {
        // Reseting page will call 'loadData'
        this.rowsSelected = [];
        this.filtersCriteria?.sanitise();
        this.filtersCriteria?.resetPage();
      } else {
        // Calling 'loadData' directly
        this.rowsSelected = [];
        this.filtersCriteria?.sanitise();
        this.loadData();
      }
    },

    async loadData() {
      try {
        this.loading = true;
        const data = await this.fetchData(this.filtersCriteria.toSearchCriteria());
        this.rows = data ? data.rows : [];
        this.rowsTotal = data ? data.total : 0;
      } catch (error) {
        this.rows = [];
        this.rowsTotal = 0;
        throw error;
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