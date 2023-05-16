const mixin = {
  props: {
    domains: {
      type: Array,
      required: true
    },

    domain: {
      type: Object,
      default: () => null
    },

    cohort: {
      type: Object,
      default: () => null
    }
  },

  emits: ["update:domain", "update:cohort"],

  data() {
    return {
      tabs: this.domains,
      tab: this.domain?.name || this.domains[0].name,
      item: this.cohort?.name || this.domains[0].cohorts[0].name
    };
  },

  watch: {
    domains(value) {
      this.tabs = value;
      this.tab = null;
      this.item = null;
    },

    domain(value) {
      this.tab = value?.name;
    },

    cohort(value) {
      this.item = value?.name;
    },

    tab(value) {
      let domain = this.domains.find(domain => domain.name == value);
      if (!domain && this.domains.length) {
        domain = this.domains.slice(-1)[0];
        this.tab = domain.name;
      }
      let cohort = domain.cohorts[0];
      this.$emit("update:domain", domain);
      this.$emit("update:cohort", cohort);
    },

    item(value) {
      const domain = this.domains.find(domain => domain.name == this.tab);
      const cohort = domain.cohorts.find(cohort => cohort.name == value);
      this.$emit("update:cohort", cohort);
    }
  },

  methods: {
    getIcon(domain) {
      switch (domain) {
        case "donors": return "las la-user-circle";
        case "mris": return "las la-x-ray";
        case "tissues": return "svguse:/icons.svg#u-tissue";
        case "cells": return "las la-microscope";
        case "organoids": return "svguse:/icons.svg#u-organoid";
        case "xenografts": return "svguse:/icons.svg#u-xenograft";
        case "genes": return "svguse:/icons.svg#u-gene";
        case "ssms": return "svguse:/icons.svg#u-ssm";
        case "cnvs": return "svguse:/icons.svg#u-cnv";
        case "svs": return "svguse:/icons.svg#u-sv";
        default: return null;
      }
    },

    getBadgeColor(domain) {
      return domain == this.tab
        ? "primary"
        : "grey-5";
    }
  }
};

export default mixin;