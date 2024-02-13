<template>
  <div>
    <div>
      <span>Diagnosis: </span>
      <span v-if="donor.clinicalData?.diagnosis" class="text-black">{{ donor.clinicalData?.diagnosis }}</span>
      <span v-else class="text-black">Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    donor: {
      type: Object,
      required: true
    }
  }
}
</script>