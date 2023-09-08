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
          <q-tab v-for="domain in domains" :name="domain.name" :icon="getDomainIcon(domain.name)">
            <q-badge :color="getDomainBadgeColor(domain.name)" rounded>
              {{ domain.cohorts?.length }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="tab" class="q-pl-sm">
          <q-tab-panel v-for="domain in domains" :name="domain.name" class="q-pa-none">
            <div class="col">
              <q-list>
                <q-item v-for="cohort in domain.cohorts" :active="cohort.name == item" @click="item = cohort.name" clickable>
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ cohort.name }}
                    </q-item-label>
                    <q-item-label lines="1" caption>
                      {{ $helpers.content.toDateTimeString(cohort.date) }}
                    </q-item-label>
                  </q-item-section>
                  <q-checkbox v-model="cohort.selected" class="q-mr-sm" dense />
                </q-item>
              </q-list>
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
import DomainNames from "@/_settings/domain-names";
import mixin from "./mixin";

export default {
  components: {
    UCohortsButtonShow,
    UCohortsButtonHide
  },

  mixins: [mixin],

  emits: ["hide"],

  computed: {
    title() {
      switch (this.tab) {
        case DomainNames.Donors: return "Donor Cohorts";
        case DomainNames.Mris: return "MRI Cohorts";
        case DomainNames.Tissues: return "Tissue Cohorts";
        case DomainNames.Cells: return "Cell Line Cohorts";
        case DomainNames.Organoids: return "Organoid Cohorts";
        case DomainNames.Xenografts: return "Xenograft Cohorts";
        case DomainNames.Genes: return "Gene Cohorts";
        case DomainNames.Ssms: return "SSM Cohorts";
        case DomainNames.Cnvs: return "CNV Cohorts";
        case DomainNames.Svs: return "SV Cohorts";
        default: return "Cohorts";
      }
    }
  },
}
</script>