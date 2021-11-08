const mixin = {
  props: {
    modelValue: {
      type: Object,
      required: false
    },

    context: {
      type: Object,
      required: false
    }
  },

  emits: ["update:modelValue"],

  methods: {
    onUpdate() {
      this.filtersCriteria.sanitise();

      this.$emit("update:modelValue", this.filtersCriteria);
    }
  }
};

export default mixin;