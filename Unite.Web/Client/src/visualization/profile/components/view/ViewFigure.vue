<template>
  <div class="row items-center q-gutter-sm" :style="styles">
    <div :class="classes"></div>
    <div>
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ["square", "line", "circle"].includes(value)
    },
    label: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false,
      default: "primary"
    },
    active: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    classes() {
      return [this.type, `bg-${this.color}`];
    },
    styles() {
      return {
        opacity: this.active ? 1 : 0.5
      };
    }
  }
}
</script>

<style type="sass" scoped>
.square {
  width: 15px;
  height: 15px;
}

.line {
  width: 15px;
  height: 3px;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>