<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <q-btn
          icon="las la-filter"
          dense rounded unelevated
          @click="false"
        />
      </div>

      <div>
        <span class="text-subtitle1">
          {{title}}
        </span>
      </div>

      <div>
        <q-btn
          icon="las la-chevron-circle-left"
          dense rounded unelevated
          @click="$emit('close')"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs 
          v-model="tab"
          indicator-color="parimary" 
          active-color="primary" 
          align="left" 
          dense vertical>
          <q-tab
            v-for="tabItem in domains"
            :key="tabItem.name"
            :name="tabItem.name"
            :icon="getIcon(tabItem.name)">
            <q-badge :color="getBadgeColor(tabItem.name)" rounded>
              {{tabItem.cohorts.length}}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="tab" class="q-pl-sm">
          <q-tab-panel
            v-for="tabItem in domains"
            :key="tabItem.name"
            :name="tabItem.name"
            class="q-pa-none">
            <div class="col">
            <!-- <q-scroll-area class="fit"> -->
              <q-list>
                <q-item
                  v-for="listItem in tabItem.cohorts"
                  :key="listItem.name"
                  :active="listItem.name == item"
                  @click="item = listItem.name"
                  clickable>
                  <q-item-section>
                    <q-item-label lines="1">
                      {{listItem.name}}
                    </q-item-label>
                    <q-item-label lines="1" caption>
                      {{$helpers.content.toDateTimeString(listItem.date)}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            <!-- </q-scroll-area> -->
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

  emits: ["update:domain", "update:cohort", "close"],

  data() {
    return {
      tabs: this.domains,
      tab: this.domain?.name || this.domains[0].name,
      item: this.cohort?.name || this.domains[0].cohorts[0].name
    };
  },

  computed: {
    title() {
      switch (this.tab) {
        case "donors": return "Donor Filters";
        case "mris": return "MRI Filters";
        case "tissues": return "Tissue Filters";
        case "cells": return "Cell Line Filters";
        case "organoids": return "Organoid Filters";
        case "xenografts": return "Xenograft Filters";
        case "genes": return "Gene Filters";
        case "ssms": return "SSM Filters";
        case "cnvs": return "CNV Filters";
        case "svs": return "SV Filters";
        default: return "Filters";
      }
    }
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
      const domain = this.domains.find(domain => domain.name == value);
      const cohort = domain.cohorts[0]; 
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
        case "xenografts": return "svguse:/icons.svg#u-mouse";
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
}
</script>