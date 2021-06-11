<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <span class="text-h5 u-text-title">Specimens</span>
    </div>

    <div class="row">
      <div class="col">
        <u-specimens-tree 
          :donor="donor" 
          :specimens="specimens"
          :current="donor.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import USpecimensTree from "../../specimens/base/hierarchy/SpecimensTree.vue";

export default {
  props: ["donor", "specimens"],

  components: {
    USpecimensTree: USpecimensTree
  }
}
</script>