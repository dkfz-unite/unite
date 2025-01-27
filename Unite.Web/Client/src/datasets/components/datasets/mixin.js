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
      if (!this.datasets) return [];
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
    if (this.tab)
      this.$emit("update:domain", this.tab);

    this.item = this.dataset || this.datasetItems[0]?.id || null;
    if (this.item)
      this.$emit("update:dataset", this.item);
  },

  watch: {
    domain(value) {
    },

    dataset(value) {
    },
  },

  methods: {
    onTabClick(option) {
      if (this.tab != option.name) {
        this.tab = option.name;
        this.$emit("update:domain", option.name);
      }
    },

    onItemClick(option) {
      if (this.item != option.id) {
        this.item = option.id;
        this.$emit("update:dataset", option.id);
      }
    },

    onItemSelect(option) {
      if (option.selected) {
        const orders = this.datasets.filter(dataset => dataset.selected).map(dataset => dataset.order || 0);
        option.order = Math.max(...orders) + 1;
      }

      this.onItemClick(option);
    },

    update() {
      if (this.datasetItems?.length) {
        this.item = this.datasetItems[0]?.id;
        this.$emit("update:dataset", this.item);
      } else {
        this.tab = this.domainItems[0]?.name;
        this.item = this.datasetItems[0]?.id;
        this.$emit("update:domain", this.tab);
        this.$emit("update:dataset", this.item);
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