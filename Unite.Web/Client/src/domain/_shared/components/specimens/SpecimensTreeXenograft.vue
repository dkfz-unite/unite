<template>
  <div>
    <div>
      <span>Mouse Strain: </span>
      <span v-if="xenograft.strain" class="text-black">{{xenograft.mouseStrain}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Group Size: </span>
      <span v-if="xenograft.groupSize" class="text-black">{{xenograft.groupSize}}</span>
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
  }
}
</script>
