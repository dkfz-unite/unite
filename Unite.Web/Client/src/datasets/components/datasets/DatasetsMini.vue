<template>
  <div class="q-gutter-sm">
    <!-- Header -->
    <div class="row justify-between q-pl-xs">
      <div>
        <u-button-show @click="false" />
      </div>
    </div>

    <!-- Filters -->
    <div class="row">
      <div class="col-auto">
        <q-tabs v-model="tab" indicator-color="transparent" active-color="primary" align="left" dense vertical>
          <q-tab v-for="domainItem in domainItems" :name="domainItem.name" :icon="domainItem.icon">
            <q-badge :color="getDomainBadgeColor(domainItem.name)" rounded>
              {{ domainItem.size }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UButtonShow from "./buttons/ButtonShow.vue";
import mixin from "./mixin";

export default {
  components: {
    UButtonShow
  },

  mixins: [mixin]
}
</script>