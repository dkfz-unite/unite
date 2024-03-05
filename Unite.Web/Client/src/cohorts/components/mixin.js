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
    cohort: {
      type: Object,
      default: null
    }
  },

  emits: ["update:domain", "update:cohort"],

  data() {
    return {
      tab: this.domain?.name || null,
      item: this.cohort?.name || null
    };
  },

  watch: {
    domains(value) {
    },

    domain(value) {
      this.tab = value.name;
    },

    cohort(value) {
      this.item = value.name;
    },

    tab(value) {
      const domain = this.domains.find(domain => domain.name == value) || this.domains[0] || null;
      this.$emit("update:domain", domain);
    },

    item(value) {
      const domain = this.domains.find(domain => domain.name == this.tab) || this.domains[0] || null;
      const cohort = domain?.cohorts.find(cohort => cohort.name == value) || domain.cohorts[0] || null;
      this.$emit("update:cohort", cohort);
    }
  },

  mounted() {
    // console.log("mounted");
  },

  updated() {
    // console.log("updated");
  },

  methods: {
    getDomainIcon(domain) {
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

    getDomainBadgeColor(domain) {
      return domain == this.tab
        ? "primary"
        : "grey-5";
    }
  }
};

export default mixin;