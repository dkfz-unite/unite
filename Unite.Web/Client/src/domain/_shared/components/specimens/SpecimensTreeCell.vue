<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="cell.creationDay" class="text-black">{{cell.creationDay}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Type: </span>
      <span v-if="cell.type" class="text-black">{{cell.type}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Culture Type: </span>
      <span v-if="cell.cultureType" class="text-black">{{cell.cultureType}}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cell: {
      type: Object,
      required: true
    }
  }
}
</script>
