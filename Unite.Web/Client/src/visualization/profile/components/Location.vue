<template>
  <div v-if="location" class="row self-center">
  <div class="text-weight-medium">Location:</div>
    <div class="q-ml-xs">
      {{ getChromosomeLabel(location.start.c) }}:{{ location.start.s }} - {{ getChromosomeLabel(location.end.c) }}:{{ location.end.e }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    location: Object
  },

  methods: {
    getChromosomeLabel(chr) {
      return chr == 23 ? "X"
           : chr == 24 ? "Y"
           : chr.toString();
    }
  }
}
</script>