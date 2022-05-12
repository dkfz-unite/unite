<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="xenograft.creationDay" class="text-black">{{xenograft.creationDay}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Mice: </span>
      <span v-if="mice" class="text-black" title="Mouse Strain / Amount">{{mice}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Tumorigenicity: </span>
      <span v-if="xenograft.tumorigenicity" class="text-black">{{$helpers.content.toBooleanString(xenograft.tumorigenicity)}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    xenograft: {
      type: Object,
      required: true
    }
  },

  computed: {
    mice() {
      if (this.xenograft.groupSize && this.xenograft.mouseStrain) {
        return `${this.xenograft.mouseStrain} / ${this.xenograft.groupSize}`;
      } else if (this.xenograft.groupSize) {
        return this.xenograft.groupSize;
      } else if (this.xenograft.mouseStrain) {
        return this.xenograft.mouseStrain;
      } else {
        return null;
      }
    }
  }
}
</script>
