<template>
  <div class="col q-gutter-sm">
    <div class="row">
      <span class="text-subtitle text-grey">General</span>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          label="Name (Optional)"
          type="text"
          v-model="analysis.name"
          autofocus
          clearable outlined square dense
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
          label="Description (Optional)"
          type="text"
          v-model="analysis.description"
          clearable outlined square dense
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    analysis: {
      type: Object,
      required: true
    }
   }
}
</script>