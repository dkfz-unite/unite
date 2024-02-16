<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-button-show @click="false" />
      </div>
      <div class="text-subtitle1">
        {{ getDomainTitle(tab) }} Datasets
      </div>
      <div>
        <u-button-hide @click="$emit('hide')" />
      </div>
    </div>

    <!-- Items -->
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
                <template v-for="cohort in domain.cohorts">
                  <q-item :active="cohort.name == item" @click="item = cohort.name" class="q-px-sm q-py-xs" clickable>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ cohort.name }}
                      </q-item-label>
                      <q-item-label lines="1" caption>
                        {{ $helpers.content.toDateTimeString(cohort.date) }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox v-model="cohort.selected" @click="onSelect(cohort)" dense />
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import UButtonShow from "./buttons/ButtonShow.vue";
import UButtonHide from "./buttons/ButtonHide.vue";
import mixin from "./mixin";

export default {
  components: {
    UButtonShow,
    UButtonHide
  },

  mixins: [mixin],

  emits: ["hide"],

  methods: {
    onSelect(cohort) {
      if (cohort.selected) {
        const orders = this.domains.flatMap(domain => domain.cohorts).map(cohort => cohort.order || 0);
        cohort.order = Math.max(...orders) + 1;
      }
    }
  }
}
</script>