import Settings from "@/_settings/settings";

const mixin = {
  props: {
    domain: {
      type: String,
      default: null
    },
    dataset: {
      type: String,
      default: null
    },
    datasets: {
      type: Array,
      default: () => []
    }
  },

  emits: ["update:domain", "update:dataset"],

  data() {
    return {
      tab: this.domain,
      item: this.dataset
    };
  },

  computed: {
    domainItems() {
      const names = this.datasets
        .map(dataset => dataset.domain)
        .distinct();
      
      const items = Settings.searchable
        .filter(item => names.includes(item.domain))
        .map(item => ({
          name: item.domain,
          title: item.title,
          icon: item.icon,
          size: this.datasets.filter(dataset => dataset.domain == item.domain).length
        }));
        
        return items;
    },

    datasetItems() {
      if (!this.tab) return [];

      const items = this.datasets
        .filter(dataset => dataset.domain == this.tab);
        
      return items;
    }
  },

  mounted() {
    this.tab = this.domain || this.domainItems[0]?.name || null;
    this.item = this.dataset || this.datasetItems[0]?.id || null;
  },

  watch: {
    tab(value) {
      this.item = this.datasetItems[0]?.id;
      this.$emit("update:domain", value);
    },

    item(value) {
      this.$emit("update:dataset", value);
    }
  },

  methods: {
    update() {
      if (this.datasetItems?.length) {
        this.item = this.datasetItems[0]?.id;
      } else {
        this.tab = this.domainItems[0]?.name;
        this.item = this.datasetItems[0]?.id;
      }
    },

    getDomainIcon(domain) {
      return Settings[domain]?.icon;
    },

    getDomainTitle(domain) {
      return Settings[domain]?.title;
    },

    getDomainBadgeColor(domain) {
      return domain == this.tab ? "primary" : "grey-5";
    }
  }
};

export default mixin;