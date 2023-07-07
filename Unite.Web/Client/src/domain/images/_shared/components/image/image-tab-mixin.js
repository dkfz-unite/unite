const mixin = {
  props: {
    image: Object
  },
  
  methods: {
    getDomain(name) {
      return this.image.mri ? this.$store.state.mri[name] :
             this.image.ct ? this.$store.state.ct[name] :
             null;
    }
  }
};

export default mixin;