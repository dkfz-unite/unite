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
          <q-tab v-for="domainItem in domainItems" :name="domainItem.name" :icon="domainItem.icon">
            <q-badge :color="getDomainBadgeColor(domainItem.name)" rounded>
              {{ domainItem.size }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="tab" class="q-pl-sm">
          <q-tab-panel v-for="domainItem in domainItems" :name="domainItem.name" class="q-pa-none">
            <div class="col">
              <q-list>
                <template v-for="datasetItem in datasetItems">
                  <q-item :active="datasetItem.id == item" @click="onClick(datasetItem)" class="q-px-sm q-py-xs" clickable>
                    <q-item-section>
                      <q-item-label lines="1">
                        {{ datasetItem.name }}
                      </q-item-label>
                      <q-item-label lines="1" caption>
                        {{ $helpers.content.toDateTimeString(datasetItem.date) }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox v-model="datasetItem.selected" @click="onSelect(datasetItem)" dense />
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
    onClick(item) {      
      this.item = item.id;      
    },

    onSelect(item) {
      this.item = item.id;

      if (item.selected) {
        const orders = this.datasets.filter(dataset => dataset.selected).map(dataset => dataset.order || 0);
        item.order = Math.max(...orders) + 1;        
      }
    }
  }
}
</script>