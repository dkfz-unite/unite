<template>
  <q-item-section>
    <q-item-label lines="1">{{ analysis.name || analysis.key }}</q-item-label>
    <q-item-label lines="1" caption class="text-weight-medium">{{ getAnalysisType(analysis.type) }}</q-item-label>
    <q-item-label lines="1" caption>{{ $helpers.content.toDateTimeString(analysis.date) }}</q-item-label>
  </q-item-section>
  <q-item-section side>
    <q-circular-progress
      size="22px"
      :value="getProgressValue(analysis.status) * 100"
      :color="getProgressColor(analysis.status)"
      track-color="grey-4"
    />
  </q-item-section>
</template>

<script>
import mixin from "./analysis-mixin";

export default {
  mixins: [mixin],

  props: {
    analysis: {
      type: Object,
      required: true
    }
  }
}
</script>