<template>
  <q-tabs
    align="left" 
    dense 
    shrink 
    stretch 
    inline-label
    outside-arrows>
    
    <!-- :class="{'q-px-none' : $q.screen.gt.md}" -->
    <q-route-tab
      :label="Settings.donors.title"
      :icon="Settings.donors.icon"
      :to="{ name: Settings.donors.domain }"
    />

    <q-route-tab
      :label="Settings.mris.title"
      :icon="Settings.mris.icon"
      :to="{ name: Settings.mris.domain }"
    />

    <q-route-tab
      label="Specimens"
      :icon="getSpecimensIcon()"
      :to="getSpecimensRoute()"
      @click.prevent="null">
      <q-menu fit>
        <q-list dense>
          <q-item :to="{ name: Settings.materials.domain }" :active="$route.name == Settings.materials.domain">
            <q-item-section>
              <!-- :class="{ 'q-px-sm' : $q.screen.gt.md }" -->
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon :name="Settings.materials.icon" size="sm" />
                <span>{{ Settings.materials.title }}</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: Settings.lines.domain }" :active="$route.name == Settings.lines.domain">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon :name="Settings.lines.icon" size="sm" />
                <span>{{ Settings.lines.title }}</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'organoids' }" :active="$route.name == 'organoids'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-organoid" size="sm" />
                <span>Organoids</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'xenografts' }" :active="$route.name == 'xenografts'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-xenograft" size="sm" />
                <span>Xenografts</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-route-tab>

    <q-route-tab
      label="Genes"
      icon="svguse:/icons.svg#u-gene"
      :to="{ name: 'genes' }"
    />

    <q-route-tab
      label="Variants"
      :icon="getVariantsIcon()"
      :to="getVariantsRoute()"
      @click.prevent="null">
      <q-menu fit>
        <q-list dense>
          <q-item :to="{ name: 'ssms' }" :active="$route.name == 'ssms'">
            <q-item-section>
              <!-- :class="{ 'q-px-sm' : $q.screen.gt.md }" -->
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-ssm" size="sm" />
                <span>Mutations (SSM)</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'cnvs' }" :active="$route.name == 'cnvs'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-cnv" size="sm" />
                <span>Copy Number Variants (CNV)</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'svs' }" :active="$route.name == 'svs'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-sv" size="sm" />
                <span>Structural Variants (SV)</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-route-tab>

    <q-space />

    <q-route-tab
      label="Cohorts"
      icon="las la-archive"
      :to="{ name: 'cohorts' }"
    />

    <q-route-tab
      label="Analysis"
      icon="las la-chart-pie"
      :to="{ name: 'analysis' }"
    />
  </q-tabs>
</template>

<script>
import Settings from "@/_settings/settings";

export default {
  setup() {
    return {
      Settings
    }
  },

  methods: {
    getSpecimensRoute() {
      const routes = [Settings.materials.domain, Settings.lines.domain, "organoids", "xenografts"];
      if (routes.includes(this.$route.name)) {
        return this.$route.name;
      } else {
        return null;
      }
    },

    getSpecimensIcon() {
      switch (this.$route.name) {
        case Settings.materials.domain: return Settings.materials.icon;
        case Settings.lines.domain: return Settings.lines.icon;
        case Settings.organoids.domain: return Settings.organoids.icon;
        case Settings.xenografts.domain: return Settings.xenografts.icon;
        default: return "svguse:/icons.svg#u-tissue";
      }
    },

    getVariantsRoute() {
      if (["ssms", "cnvs", "svs"].includes(this.$route.name)) {
        return this.$route.name;
      } else {
        return null;
      }
    },

    getVariantsIcon() {
      switch (this.$route.name) {
        case "ssms": return "svguse:/icons.svg#u-ssm";
        case "cnvs": return "svguse:/icons.svg#u-cnv";
        case "svs": return "svguse:/icons.svg#u-sv";
        default: return "svguse:/icons.svg#u-ssm";
      }
    }
  }
}
</script>