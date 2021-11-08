<template>
  <q-banner
    v-if="!hideBanner"
    class="text-white text-center bg-green fixed-bottom"
    inline-actions>

    All information on this environment is artificial and was generated based on real examples for presentation purposes.

    <template v-slot:action>
      <q-btn label="Dismiss" flat @click="onDismiss" />
    </template>

  </q-banner>
</template>

<script>
export default {
  data() {
    return {
      hideBanner: localStorage.hideContentBanner
    };
  },

  methods: {
    onDismiss() {
      this.hideBanner = true;
      localStorage.hideContentBanner = true;
    }
  }
}
</script>