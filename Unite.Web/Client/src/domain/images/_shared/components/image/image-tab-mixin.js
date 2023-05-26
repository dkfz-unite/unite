const mixin = {
  props: {
    image: Object
  },
  
  methods: {
    getDomain(name) {
      return this.image.mriImage ? this.$store.state.mri[name] :
             this.image.ctImage ? this.$store.state.ct[name] :
             null;
    }
  }
};

export default mixin;