<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12 col-md-7">
        <u-summary :mutation="mutation" />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <u-transcript-consequences :features="mutation.affectedTranscripts" />
      </div>
    </div>
  </div>
</template>

<script>
import USummary from "./summary/Summary.vue";
import UTranscriptConsequences from "./summary/TranscriptConsequences.vue";

export default {
  props: ["mutation"],

  components:{
    USummary: USummary,
    UTranscriptConsequences: UTranscriptConsequences
  }
};
</script>