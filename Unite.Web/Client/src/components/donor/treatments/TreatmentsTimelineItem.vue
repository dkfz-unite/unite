<template>
  <div class="q-gutter-y-sm" v-if="show">
    <div class="column" v-if="treatment.details">
      <div class="row">
        <span class="text-body1 text-bold">
          Details
        </span>
      </div>
      <div class="row">
        <span class="text-body1">
          {{treatment.details}}
        </span>
      </div>
    </div>

    <div class="column" v-if="treatment.results">
      <div class="row">
        <span class="text-body1 text-bold">
          Results
        </span>
       
      </div>
      <div class="row">
        <span class="text-body1">
          {{treatment.results}}
        </span>
      </div>
    </div>

    <div class="column" v-if="treatment.progressionStatus">
      <div class="row">
        <span class="text-body1 text-orange text-bold">
          Progression {{ getProgressionDate(treatment.progressionStatusChangeDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import contentHelpers from "../../../services/helpers/helpers.content.js";

export default {
  props: {
    treatment: {
      type: Object,
      required: true
    }
  },

  computed: {
    show() {
      return this.treatment.details 
          || this.treatment.results;
    }
  },

  methods: {
    getProgressionDate(progressionStatusChangeDate) {
      if(!progressionStatusChangeDate) {
        return null;
      } else {
        return `(${contentHelpers.toDateString(progressionStatusChangeDate)})`;
      }
    }
  }
}
</script>