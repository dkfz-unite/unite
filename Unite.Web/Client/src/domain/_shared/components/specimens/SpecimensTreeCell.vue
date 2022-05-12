<template>
  <div>
    <div>
      <span>Type: </span>
      <span v-if="cellLine.type" class="text-black">{{cellLine.type}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Culture Type: </span>
      <span v-if="cellLine.cultureType" class="text-black">{{cellLine.cultureType}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cellLine: {
      type: Object,
      required: true
    }
  }
}
</script>
