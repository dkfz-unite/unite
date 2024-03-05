<template>
  <q-tabs
    align="left" 
    dense 
    shrink 
    stretch 
    inline-label
    outside-arrows>
    
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
          <u-navigation-menu-item
            :title="Settings.ssms.title"
            :icon="Settings.ssms.icon"
            :to="{ name: Settings.ssms.domain }"
          />

          <u-navigation-menu-item
            :title="Settings.cnvs.title"
            :icon="Settings.cnvs.icon"
            :to="{ name: Settings.cnvs.domain }"
          />

          <u-navigation-menu-item
            :title="Settings.svs.title"
            :icon="Settings.svs.icon"
            :to="{ name: Settings.svs.domain }"
          />
        </q-list>
      </q-menu>
    </q-route-tab>

    <q-space />

    <q-route-tab
      :label="Settings.datasets.title"
      :icon="Settings.datasets.icon"
      :to="{ name: Settings.datasets.domain }"
    />

    <q-route-tab
      :label="Settings.analysis.title"
      :icon="Settings.analysis.icon"
      :to="{ name: Settings.analysis.domain }"
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
        Settings.ssms.domain, 
        Settings.cnvs.domain, 
        Settings.svs.domain
      ];

      return routes.includes(this.$route.name) ? this.$route.name : null;
    },

    getVariantsIcon() {
      switch (this.$route.name) {
        case Settings.ssms.domain: return Settings.ssms.icon;
        case Settings.cnvs.domain: return Settings.cnvs.icon;
        case Settings.svs.domain: return Settings.svs.icon;
        default: return Settings.ssms.icon;
      }
    }
  }
}
</script>
