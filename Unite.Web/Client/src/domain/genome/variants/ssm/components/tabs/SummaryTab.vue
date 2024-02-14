<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12 col-md-7">
        <u-summary :variant="variant" />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <u-transcript-consequences :features="variant.affectedFeatures?.filter(affectedFeature => !!affectedFeature.transcript)" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UTranscriptConsequences from "./summary/TranscriptConsequences.vue";

export default {
  components:{
    USummary,
    UTranscriptConsequences
  },

  props: {
    variant: Object
  }
}
</script>