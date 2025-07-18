<template>
  <q-drawer 
    v-model="show"
    :width="width"
    :mini="mini"
    :side="side"
    :overlay="overlay"
    :show-if-above="!overlay"
    @click.capture="onClick" 
    bordered
    elevated>
    <template #default>
      <div class="col q-pa-sm">
        <slot :open="open" :close="close" />
      </div>
    </template>

    <template #mini>
      <div class="col q-pa-sm">
        <slot name="mini" :open="open" :close="close" />
      </div>
    </template>
  </q-drawer>
</template>

<script>
export default {
  props: {
    shown: {
      type: Boolean,
      default: true
    },

    minimized: {
      type: Boolean,
      default: false
    },

    side: {
      type: String,
      default: "left"
    },

    overlay: {
      type: Boolean,
      default: false
    },

    autoOpen: {
      type: Boolean,
      default: false
    },

    autoClose: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: 330
    }
  },

  emits: ["update:shown", "update:minimized"],

  data() {
    return {
      show: this.shown,
      mini: this.minimized
    };
  },

  computed: {
    screenSmaller() {
      return this.$q.screen.lt.md;
    },
    screenLarger() {
      return this.$q.screen.gt.sm;
    }
  },

  watch: {
    show(value) {
      this.$emit("update:shown", value);
    },

    mini(value) {
      this.$emit("update:minimized", value);
    },

    screenSmaller(newValue, oldValue){
      if (this.autoClose && newValue && newValue != oldValue) {
        this.close();
      }
    },

    screenLarger(newValue, oldValue) {
      if (this.autoOpen && newValue && newValue != oldValue) {
        this.open();
      }
    }
  },

  methods: {
    onClick() {
      if (this.mini) {
        this.open();
      }
    },

    open() {
      this.show = true;
      this.mini = false;
    },

    minimize() {
      if (this.screenSmaller) {
        this.show = false;
        this.mini = false;
      } else {
        this.mini = true;
      }
    },

    close() {
      this.show = false;
    },

    toggle() {
      this.show = !this.show;
    }
  }
}
</script>