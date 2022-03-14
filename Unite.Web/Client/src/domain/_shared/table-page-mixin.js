const mixin = {
  data() {
    return {
      loading: false,
      rows: [],
      rowsTotal: 0
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

    /**
     * Indicates which field in domain store module keeps filters criteria.
     * Can be overriden in component.
     * @returns Filters criteria property name string.
     */
    criteriaPropertyName: () => "filtersCriteria",

    /**
     * Indicates which field in domain store module keeps filters context.
     * Can be overriden in component.
     * @returns Filters context property name string.
     */
    contextPropertyName: () => "filtersContext",

    /**
     * Indicates which field in domain store module keeps selected items.
     * Can be overriden in component.
     * @returns Selected items property name string.
     */
    selectionPropertyName: () => "selected",

    filtersCriteria: {
      get() { return this.domain[this.criteriaPropertyName] },
      set(value) { this.domain[this.criteriaPropertyName] = value }
    },

    filtersContext: {
      get() { return this.domain[this.contextPropertyName] },
      set(value) { this.domain[this.contextPropertyName] = value }
    },

    rowsSelected: {
      get() { return this.domain[this.selectionPropertyName] },
      set(value) { this.domain[this.selectionPropertyName] = value }
    },

    // filtersCriteria: {
    //   get() { return this.domain.filtersCriteria },
    //   set(value) { this.domain.filtersCriteria = value }
    // },

    // filtersContext: {
    //   get() { return this.domain.filtersContext },
    //   set(value) { this.domain.filtersContext = value }
    // },

    // rowsSelected: {
    //   get() { return this.domain.selected },
    //   set(value) { this.domain.selected = value }
    // },
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