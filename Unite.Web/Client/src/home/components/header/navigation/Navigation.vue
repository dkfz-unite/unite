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
          <u-navigation-menu-item
            :title="Settings.materials.title"
            :icon="Settings.materials.icon"
            :to="{ name: Settings.materials.domain }"
          />

          <u-navigation-menu-item
            :title="Settings.lines.title"
            :icon="Settings.lines.icon"
            :to="{ name: Settings.lines.domain }"
          />

          <u-navigation-menu-item
            :title="Settings.organoids.title"
            :icon="Settings.organoids.icon"
            :to="{ name: Settings.organoids.domain }"
          />

          <u-navigation-menu-item
            :title="Settings.xenografts.title"
            :icon="Settings.xenografts.icon"
            :to="{ name: Settings.xenografts.domain }"
          />
        </q-list>
      </q-menu>
    </q-route-tab>

    <q-route-tab
      :label="Settings.genes.title"
      :icon="Settings.genes.icon"
      :to="{ name: Settings.genes.domain }"
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
import UNavigationMenuItem from "./NavigationMenuItem.vue";
import Settings from "@/_settings/settings";

export default {
  components: {
    UNavigationMenuItem
  },

  setup() {
    return {
      Settings
    }
  },

  methods: {
    getSpecimensRoute() {
      const routes = [
        Settings.materials.domain, 
        Settings.lines.domain, 
        Settings.organoids.domain, 
        Settings.xenografts.domain
      ];

      return routes.includes(this.$route.name) ? this.$route.name : null;
    },

    getSpecimensIcon() {
      switch (this.$route.name) {
        case Settings.materials.domain: return Settings.materials.icon;
        case Settings.lines.domain: return Settings.lines.icon;
        case Settings.organoids.domain: return Settings.organoids.icon;
        case Settings.xenografts.domain: return Settings.xenografts.icon;
        default: return Settings.materials.icon;
      }
    },

    getVariantsRoute() {
      const routes = [
        "ssms", 
        "cnvs", 
        "svs"
      ];

      return routes.includes(this.$route.name) ? this.$route.name : null;
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