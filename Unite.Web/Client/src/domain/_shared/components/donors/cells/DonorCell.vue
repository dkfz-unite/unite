<template>
  <q-td :props="props">
    <u-donor-link :id="props.value" />
  </q-td>
</template>

<script>
import UDonorLink from "../DonorLink.vue";
export default {
  components: { UDonorLink },
  props: ["props"]
}
</script>