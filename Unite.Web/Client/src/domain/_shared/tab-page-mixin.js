const mixin = {
  data() {
    return {
      tab: this.$route.params.tab || this.$route.meta.tab
    }
  },

  watch: {
    tab(value) {
      this.$router.replace({ params: { tab: value }});
    }
  }
};

export default mixin;