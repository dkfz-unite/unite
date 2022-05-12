<template>
  <div>
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
