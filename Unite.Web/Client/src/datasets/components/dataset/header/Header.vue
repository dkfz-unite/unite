<template>
  <div class="col">
    <!-- Title -->
    <div>
      <span class="text-h6">
        {{ dataset.name }}
      </span>
    </div>

    <!-- Description -->
    <div v-if="dataset.description">
      <span class="text-subtitle1">
        {{ dataset.description }}
      </span>
    </div>

    <!-- Date and rows number -->
    <div>
      <span class="text-caption q-gutter-x-lg">
        <span class="text-weight-bold">
          {{ $helpers.content.toDateTimeString(dataset.date) }}
        </span>
        <span class="text-weight-bold" v-if="dataset.data != null">
          {{ dataset.data.total }} rows of data
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataset: {
      type: Object,
      required: true
    }
  }
}
</script>