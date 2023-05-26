<template>
  <div class="q-gutter-sm" v-if="filtersCriteria">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-filters-button @click="false" />
      </div>

      <div class="text-subtitle1">
        {{ getTitle(filtersModel) }}
      </div>

      <div>
        <u-filters-button-hide @click="$emit('hide')" />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="filtersModel" indicator-color="parimary" active-color="primary" align="left" dense vertical>
          <q-tab v-for="model in models" :name="model" :icon="getIcon(model)">
            <q-badge v-if="filtersCriteria[model].numberOfFilters" :color="getBadgeColor(model)" rounded>
              {{ filtersCriteria[model].numberOfFilters }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>

      <q-separator vertical />

      <div class="col">
        <q-tab-panels v-model="filtersModel" class="q-pl-sm">
          <q-tab-panel v-for="model in models" :name="model" class="q-pa-none">
            <div class="col q-gutter-y-sm">
              <div class="row">
                <u-criteria-filters
                  v-if="filtersCriteria[model]"
                  :criteria="filtersCriteria[model]"
                  :context="filtersContext[model]"
                  :filters="getFilters(model)"
                  @update="onUpdate"
                />
              </div>
              <div class="row" v-if="filtersCriteria[model].numberOfFilters">
                <u-filters-button-clear @click="filtersCriteria[model].clear(); onUpdate();" />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin]
};
</script>