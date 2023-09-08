<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-cohorts-button-show @click="false" />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="tab" indicator-color="transparent" active-color="primary" align="left" dense vertical>
          <q-tab v-for="domain in domains" :name="domain.name" :icon="getDomainIcon(domain.name)">
            <q-badge :color="getDomainBadgeColor(domain.name)" rounded>
              {{ domain.cohorts?.length }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UCohortsButtonShow from "./CohortsButtonShow.vue";
import mixin from "./mixin";

export default {
  components: {
    UCohortsButtonShow
  },

  mixins: [mixin]
}
</script>