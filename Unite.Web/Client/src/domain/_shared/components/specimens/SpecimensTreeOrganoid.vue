<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="specimen.creationDay" class="text-black">{{specimen.creationDay}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Medium: </span>
      <span v-if="specimen.medium" class="text-black">{{specimen.medium}}</span>
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
  }
}
</script>
