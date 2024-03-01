<template>
  <div class="col">
    <div class="row items-center q-gutter-x-sm">
      <div>
        <q-icon :name="icon" size="xs" />
      </div>
      <div>
        <q-item-label>
          <div class="row justify-left">
            <div> {{ sample.referenceId }}</div>
          </div>
        </q-item-label>
        <q-item-label v-if="showAnalyses" caption>{{ sample.analyses.join(", ") }}</q-item-label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sample: {
      type: Object,
      required: true
    },
    showAnalyses: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    icon() {
      return this.sample.type == "Material" ? "svguse:/icons.svg#u-material"
           : this.sample.type == "Line" ? "las la-microscope"
           : this.sample.type == "Organoid" ? "svguse:/icons.svg#u-organoid"
           : this.sample.type == "Xenograft" ? "svguse:/icons.svg#u-xenograft"
           : null;
    }
  }
}
</script>