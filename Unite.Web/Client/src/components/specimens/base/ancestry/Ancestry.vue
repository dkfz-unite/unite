<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Ancestry</span>
    </div>

    <div class="row">
      <div class="col">
        <u-specimens-tree 
          :donor="donor" 
          :specimens="specimens"
          :current="current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import USpecimensTree from "./SpecimensTree.vue";

export default {
  props: ["donor", "specimens", "current"],

  components: {
    USpecimensTree: USpecimensTree
  }
}
</script>