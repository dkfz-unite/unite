<template>
  <!-- Analysis button -->
  <teleport v-if="analyses?.size && $q.screen.lt.md" to="#top-left-placeholder">
    <u-analyses-button-show @click="$refs.drawer.open()" />
  </teleport>

  <!-- Analysis drawer -->
  <u-drawer
    ref="drawer"
    side="left"
    v-if="analyses?.size"
    v-model:shown="drawer.show"
    v-model:minimized="drawer.mini"
    :width="300">
    <template #default>
      <div class="col q-gutter-sm">
        <div class="row justify-between q-pl-xs">
          <div>
            <u-analyses-button-show @click="false" />
          </div>

          <div class="text-subtitle1">
            {{ Settings.analysis.title }} 
          </div>

          <div>
            <u-analyses-button-hide @click="$refs.drawer.minimize()" />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-list>
              <template v-for="[key, analysis] in analyses">
                <q-item
                  :active="analysisKey == analysis.key" 
                  @click="analysisKey = analysis.key"
                  class="q-px-xs q-py-xs" clickable>
                  <u-analysis-list-item :analysis="analysis" />
                </q-item>
                <q-separator />
              </template>
            </q-list>
          </div>
        </div>
      </div>
    </template>

    <template #mini>
      <div class="q-gutter-sm">
        <div class="row justify-between q-pl-xs">
          <div>
            <u-analyses-button-show @click="false" />
          </div>
        </div>
      </div>
    </template>
  </u-drawer>

  <!-- Analysis page -->
  <div class="col q-gutter-y-sm">
    <div class="row">
      <q-breadcrumbs gutter="xs" class="text-subtitle1">
        <q-breadcrumbs-el :icon="Settings.home.icon" :to="{ name: Settings.home.domain}" />
        <q-breadcrumbs-el :label="Settings.analysis.crumb" />
      </q-breadcrumbs>
    </div>

    <div v-if="analysis" class="col">
      <u-analysis-item :analysis="analysis" @delete="onDeleted" />
    </div>

    <div v-if="!analyses?.size" class="col">
      <div class="fixed-center">
        <span>No analyses have been saved</span>
      </div>
    </div>
  </div>
</template>

<script>
import UDrawer from "../_shared/components/base/Drawer.vue";
import UAnalysesButtonShow from "./components/AnalysesButtonShow.vue";
import UAnalysesButtonHide from "./components/AnalysesButtonHide.vue";
import UAnalysisListItem from "./components/AnalysisListItem.vue";
import UAnalysisItem from "./components/AnalysisItem.vue";
import Settings from "@/_settings/settings";

export default {
  components: {
    UDrawer,
    UAnalysesButtonShow,
    UAnalysesButtonHide,
    UAnalysisListItem,
    UAnalysisItem,
  },

  setup() {
    return {
      Settings
    }
  },

  data() {
    return {
      analysisKey: null
    }
  },

  computed: {
    drawer() {
      return this.$store.state.leftDrawer;
    },

    analyses() {
      return this.$store.state[Settings.analysis.domain].analyses;
    },

    analysis() {
      return this.analyses.get(this.analysisKey);
    }
  },

  async mounted() {
    await this.$store.dispatch(`${Settings.analysis.domain}/loadAnalyses`);
    await this.$store.dispatch(`${Settings.analysis.domain}/startUpdatingStatus`);
    this.analysisKey = Array.from(this.analyses.values())[0]?.key || null;
  },

  async unmounted() {
    await this.$store.dispatch(`${Settings.analysis.domain}/saveAnalyses`);
    await this.$store.dispatch(`${Settings.analysis.domain}/stopUpdatingStatus`);
  },

  methods: {
    onDeleted() {
      this.analysisKey = Array.from(this.analyses.values())[0]?.key || null;
    }
  }
}
</script>
