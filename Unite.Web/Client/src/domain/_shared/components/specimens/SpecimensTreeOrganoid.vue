<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="organoid.creationDay" class="text-black">{{organoid.creationDay}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Medium: </span>
      <span v-if="organoid.medium" class="text-black">{{organoid.medium}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    organoid: {
      type: Object,
      required: true
    }
  }
}
</script>
