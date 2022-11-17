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
      label="Donors"
      icon="las la-user-circle"
      :to="{ name: 'donors' }"
    />

    <q-route-tab
      label="Images"
      icon="las la-x-ray"
      :to="{ name: 'mris' }"
    />

    <q-route-tab
      label="Specimens"
      icon="svguse:/icons.svg#u-tissue"
      :to="getSpecimensRoute()"
      @click.prevent="null">
      <q-menu fit>
        <q-list dense>
          <q-item :to="{ name: 'tissues' }" :active="$route.name == 'tissues'">
            <q-item-section>
              <!-- :class="{ 'q-px-sm' : $q.screen.gt.md }" -->
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-tissue" size="sm" />
                <span>Tissues</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'cells' }" :active="$route.name == 'cells'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="las la-microscope" size="sm" />
                <span>Cell Lines</span>
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
                <q-icon name="svguse:/icons.svg#u-mouse" size="sm" />
                <span>Xenografts</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-route-tab>

    <q-route-tab
      label="Genes"
      icon="svguse:/icons.svg#u-gene-alt"
      :to="{ name: 'genes' }"
    />

    <!-- <q-route-tab
      label="Mutations"
      icon="svguse:/icons.svg#u-mutation-alt"
      :to="{ name: 'mutations' }"
    /> -->

    <q-route-tab
      label="Variants"
      icon="svguse:/icons.svg#u-mutation-alt"
      :to="getVariantsRoute()"
      @click.prevent="null">
      <q-menu fit>
        <q-list dense>
          <q-item :to="{ name: 'ssms' }" :active="$route.name == 'ssms'">
            <q-item-section>
              <!-- :class="{ 'q-px-sm' : $q.screen.gt.md }" -->
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-mutation-alt" size="sm" />
                <span>Mutations (SSM)</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'cnvs' }" :active="$route.name == 'cnvs'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-mutation-alt" size="sm" />
                <span>Copy Number Variants (CNV)</span>
              </div>
            </q-item-section>
          </q-item>

          <q-item :to="{ name: 'svs' }" :active="$route.name == 'svs'">
            <q-item-section>
              <div class="row q-gutter-x-sm q-py-sm" :class="{ 'q-px-sm' : $q.screen.gt.md }">
                <q-icon name="svguse:/icons.svg#u-mutation-alt" size="sm" />
                <span>Structural Variants (SV)</span>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-route-tab>
  </q-tabs>
</template>

<script>
export default {
  methods: {
    getSpecimensRoute() {
      const route = this.$route.name;

      if (["tissues", "cells", "organoids", "xenografts"].includes(route)) {
        return route;
      } else {
        return null;
      }
    },

    getVariantsRoute() {
      const route = this.$route.name;

      if (["mutations", "cnvs", "svs"].includes(route)) {
        return route;
      } else {
        return null;
      }
    },
  }
}
</script>