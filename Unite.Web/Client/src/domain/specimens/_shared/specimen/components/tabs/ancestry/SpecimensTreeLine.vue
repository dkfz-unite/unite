<template>
  <div>
    <div>
      <span>Creation Day: </span>
      <span v-if="specimen.creationDay" class="text-black">{{ specimen.creationDay }}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Cells Type: </span>
      <span v-if="specimen.cellsType" class="text-black">{{ specimen.cellsType }}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
    <div>
      <span>Cells Culture Type: </span>
      <span v-if="specimen.cellsCultureType" class="text-black">{{ specimen.cellsCultureType }}</span>
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
