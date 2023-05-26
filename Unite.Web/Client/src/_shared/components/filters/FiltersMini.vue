<template>
  <div class="q-gutter-sm" v-if="filtersCriteria">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-filters-button @click="false" />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="filtersModel" indicator-color="transparent" active-color="primary" align="left" dense vertical>
          <q-tab v-for="model in models" :name="model" :icon="getIcon(model)">
            <q-badge v-if="filtersCriteria[model].numberOfFilters" :color="getBadgeColor(model)" rounded>
              {{filtersCriteria[model].numberOfFilters}}
            </q-badge>
          </q-tab>
        </q-tabs>
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