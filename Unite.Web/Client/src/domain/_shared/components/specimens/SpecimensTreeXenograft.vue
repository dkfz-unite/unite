<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="specimen.creationDay" class="text-black">{{specimen.creationDay}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Mice: </span>
      <span v-if="mice" class="text-black" title="Mouse Strain / Amount">{{mice}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Tumorigenicity: </span>
      <span v-if="specimen.tumorigenicity" class="text-black">{{$helpers.content.toBooleanString(specimen.tumorigenicity)}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specimen: {
      type: Object,
      required: true
    }
  },

  computed: {
    mice() {
      if (this.specimen.groupSize && this.specimen.mouseStrain) {
        return `${this.specimen.mouseStrain} / ${this.specimen.groupSize}`;
      } else if (this.specimen.groupSize) {
        return this.specimen.groupSize;
      } else if (this.specimen.mouseStrain) {
        return this.specimen.mouseStrain;
      } else {
        return null;
      }
    }
  }
}
</script>
