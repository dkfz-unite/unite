const mixin = {
  props: {
    specimen: Object
  },
  
  methods: {
    getDomain(name) {
      return this.specimen.tissue ? this.$store.state.tissue[name] :
             this.specimen.cellLine ? this.$store.state.cell[name] :
             this.specimen.organoid ? this.$store.state.organoid[name] :
             this.specimen.xenograft ? this.$store.state.xenograft[name] :
             null;
    }
  }
};

export default mixin;