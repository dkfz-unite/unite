<template>
  <div class="col">
    <q-stepper v-model="step" ref="stepper" color="primary" header-nav animated>
      <template v-for="(group, index) in options" :key="index">
        <q-step :name="index" title="group.title" icon="settings">
          
        </q-step>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import UBooleanOption from "./options/BooleanOption.vue";
import UNumberOption from "./options/NumberOption.vue";
import USelectOption from "./options/SelectOption.vue";

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },

  components: {
    UBooleanOption,
    UNumberOption,
    USelectOption
  },

  data() {
    return {
      step: 1
    };
  }
}
</script>