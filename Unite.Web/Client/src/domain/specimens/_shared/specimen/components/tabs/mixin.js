const mixin = {
  props: {
    specimen: Object
  },
  
  methods: {
    getDomain(name) {
      return this.specimen.material ? this.$store.state.material[name] :
             this.specimen.line ? this.$store.state.line[name] :
             this.specimen.organoid ? this.$store.state.organoid[name] :
             this.specimen.xenograft ? this.$store.state.xenograft[name] :
             null;
    }
  }
};

export default mixin;