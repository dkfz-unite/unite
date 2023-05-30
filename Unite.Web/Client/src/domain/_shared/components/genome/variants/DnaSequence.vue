<template>
  <span v-if="value">
    <template v-for="nuc in value">
      <span v-if="nuc === 'A'" class="text-center" :class="DnaColor.Text.A">A</span>
      <span v-else-if="nuc === 'C'" class="text-center" :class="DnaColor.Text.C">C</span>
      <span v-else-if="nuc === 'G'" class="text-center" :class="DnaColor.Text.G">G</span>
      <span v-else-if="nuc === 'T'" class="text-center" :class="DnaColor.Text.T">T</span>
    </template>
    <!-- <template v-if="value.length > 5">
      <span class="text-center"> ... {{value.length - 5}} other</span>
    </template> -->
  </span>
  <span v-else class="text-weight-bold">
    <span class="nucleotide text-center text-grey-8">-</span>
  </span>
</template>

<script>
import DnaColor from '@/_settings/genome/dna-color';

export default {
  props: {
    value: {
      type: String,
      required: false
    },
    compact: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return {
      DnaColor
    }
  }
};
</script>