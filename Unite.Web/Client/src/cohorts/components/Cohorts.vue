<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-cohorts-button-show @click="false" />
      </div>

      <div class="text-subtitle1">
        {{ title }}
      </div>

      <div>
        <u-cohorts-button-hide @click="$emit('hide')" />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="tab" indicator-color="parimary" active-color="primary" align="left" dense vertical>
          <q-tab v-for="tabItem in domains" :key="tabItem.name" :name="tabItem.name" :icon="getIcon(tabItem.name)">
            <q-badge :color="getBadgeColor(tabItem.name)" rounded>
              {{ tabItem.cohorts.length }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="tab" class="q-pl-sm">
          <q-tab-panel v-for="tabItem in domains" :key="tabItem.name" :name="tabItem.name" class="q-pa-none">
            <div class="col">
              <!-- <q-scroll-area class="fit"> -->
              <q-list>
                <q-item v-for="listItem in tabItem.cohorts" :key="listItem.name" :active="listItem.name == item"
                  @click="item = listItem.name" clickable>
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ listItem.name }}
                    </q-item-label>
                    <q-item-label lines="1" caption>
                      {{ $helpers.content.toDateTimeString(listItem.date) }}
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
import UCohortsButtonShow from "./CohortsButtonShow.vue";
import UCohortsButtonHide from "./CohortsButtonHide.vue";
import mixin from "./mixin";

export default {
  components: {
    UCohortsButtonShow,
    UCohortsButtonHide
  },

  mixins: [mixin],

  computed: {
    title() {
      switch (this.tab) {
        case "donors": return "Donor Cohorts";
        case "mris": return "MRI Cohorts";
        case "tissues": return "Tissue Cohorts";
        case "cells": return "Cell Line Cohorts";
        case "organoids": return "Organoid Cohorts";
        case "xenografts": return "Xenograft Cohorts";
        case "genes": return "Gene Cohorts";
        case "ssms": return "SSM Cohorts";
        case "cnvs": return "CNV Cohorts";
        case "svs": return "SV Cohorts";
        default: return "Cohorts";
      }
    }
  },
}
</script>