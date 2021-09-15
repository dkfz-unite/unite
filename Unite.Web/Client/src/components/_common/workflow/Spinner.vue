<template>
  <div class="col q-mt-xl">
    <div v-if="loading" class="row justify-center">
      <q-circular-progress v-if="loading" indeterminate size="sm" color="primary" />
    </div>
    <div v-else class="row justify-center">
      <q-icon name="las la-exclamation-circle" size="sm" color="primary"/>
      <div class="text-body1">
          Data is not accessible
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading"]
}
</script>