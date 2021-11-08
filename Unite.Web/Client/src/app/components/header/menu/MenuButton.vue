<template>
  <!-- Drawer menu (on smaller screens) -->
  <u-drawer
    v-if="screenSmaller"
    ref="drawer"
    side="right"
    :overlay="true"
    v-model:shown="$store.state.rightDrawer.show"
    v-model:mini="$store.state.rightDrawer.mini">
    <u-menu-content class="text-black" />
  </u-drawer>

  <!-- Simple menu (on larger screens) -->
  <q-menu
    v-if="screenLarger"
    target="#menu-button" 
    style="width: 300px">
    <u-menu-content class="text-black" />
  </q-menu>

  <!-- Menu button -->
  <q-btn
    id="menu-button"
    icon="las la-bars"
    rounded flat dense
    @click="openMenu"
  />
</template>

<script>
import UDrawer from "../../../../_shared/components/drawers/Drawer.vue";
import UMenuContent from "./MenuContent.vue";

export default {
  components: {
    UDrawer,
    UMenuContent
  },

  computed: {
    screenLarger() {
      return this.$q.screen.gt.sm;
    },

    screenSmaller() {
      return this.$q.screen.lt.md;
    }
  },

  watch: {
    screenLarger(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$refs.drawer.close();
      }
    }
  },

  methods: {
    openMenu() {
      if (this.screenSmaller) {
        this.$refs.drawer.open();
      }
    }
  }
}
</script>