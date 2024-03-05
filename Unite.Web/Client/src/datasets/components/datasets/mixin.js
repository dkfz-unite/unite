import Settings from "@/_settings/settings";

const mixin = {
  props: {
    domains: {
      type: Array,
      required: true
    },
    domain: {
      type: Object,
      default: null
    },
    dataset: {
      type: Object,
      default: null
    }
  },

  emits: ["update:domain", "update:dataset"],

  data() {
    return {
      tab: this.domain?.name || null,
      item: this.dataset?.name || null
    };
  },

  watch: {
    domains(value) {
    },

    domain(value) {
      this.tab = value.name;
    },

    dataset(value) {
      this.item = value.name;
    },

    tab(value) {
      const domain = this.domains.find(domain => domain.name == value) || this.domains[0] || null;
      this.$emit("update:domain", domain);
    },

    item(value) {
      const domain = this.domains.find(domain => domain.name == this.tab) || this.domains[0] || null;
      const dataset = domain?.datasets.find(dataset => dataset.name == value) || domain.datasets[0] || null;
      this.$emit("update:dataset", dataset);
    }
  },

  methods: {
    getDomainIcon(domain) {
      return Settings[domain].icon;
    },

    getDomainTitle(domain) {
      return Settings[domain].title;
    },

    getDomainBadgeColor(domain) {
      return domain == this.tab ? "primary" : "grey-5";
    }
  }
};

export default mixin;