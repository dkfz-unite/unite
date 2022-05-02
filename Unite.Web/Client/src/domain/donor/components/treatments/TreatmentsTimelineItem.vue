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
  </div>
</template>

<script>
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
  }
}
</script>