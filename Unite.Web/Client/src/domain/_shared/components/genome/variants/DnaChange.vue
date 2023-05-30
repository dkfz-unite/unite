<template>
  <div class="row">
    <u-dna-sequence :value="from"></u-dna-sequence>
    <div class="q-px-xs">></div>
    <u-dna-sequence :value="to"></u-dna-sequence>
  </div>
</template>

<script>
import UDnaSequence from "./DnaSequence.vue";

export default {
  components: {
    UDnaSequence
  },

  props: {
    from: {
      type: String,
      required: false
    },
    to: {
      type: String,
      required: false
    }
  }
};
</script>