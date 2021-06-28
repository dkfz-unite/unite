<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens"
          title="Ancestry"
          :donor="donor" 
          :specimens="specimens"
          :current="current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UAncestry from "../ancestry/Ancestry.vue";

export default {
  props: ["donor", "specimens", "current"],

  components: {
    UAncestry: UAncestry,
  },
}
</script>