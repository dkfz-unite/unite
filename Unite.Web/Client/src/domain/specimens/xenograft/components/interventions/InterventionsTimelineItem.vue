<template>
  <div class="q-gutter-y-sm" v-if="show">
    <div class="column" v-if="intervention.details">
      <div class="row">
        <span class="text-body1 text-bold">
          Details
        </span>
      </div>
      <div class="row">
        <span class="text-body1">
          {{intervention.details}}
        </span>
      </div>
    </div>

    <div class="column" v-if="intervention.results">
      <div class="row">
        <span class="text-body1 text-bold">
          Results
        </span>
      </div>
      <div class="row">
        <span class="text-body1">
          {{intervention.results}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    intervention: {
      type: Object,
      required: true
    }
  },

  computed: {
    show() {
      return this.intervention.details || this.intervention.results;
    }
  }
}
</script>