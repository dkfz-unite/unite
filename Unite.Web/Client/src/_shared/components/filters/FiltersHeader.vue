<template>
  
</template>

<script>
import UFiltersButton from "./FiltersButton.vue";
import UFiltersButtonHide from "./FiltersButtonHide.vue";

export default {
  components: { UFiltersButton, UFiltersButtonHide },

  props: {
    title: {
      type: String,
      default: "Filters"
    }
  },

  emits: ["show", "hide"]
};
</script>