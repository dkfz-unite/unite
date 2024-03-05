const tableMixin = {
    props: {
      rows: {
        type: Array,
        default() {
          return [];
        }
      },

      rowsTotal: {
        type: Number,
        default: 0
      },

      rowsSelected: {
        type: Array,
        default() {
          return [];
        }
      },

      from: {
        type: Number,
        default: 0
      },

      size: {
        type: Number,
        default: 20
      },

      title: {
        type: String,
        default: null
      },

      class: {
        type: String,
        default: null
      },

      loading: {
        type: Boolean,
        default: false
      },
    },
  
    emits: [
      "update:rowsSelected", 
      "update:from",
      "update:size"
    ],
  
    data() {
      return {
        dataFrom: this.from,
        dataSize: this.size,
        dataSelected: this.rowsSelected || []
      }
    },

    // updated() {
    //   this.dataFrom = this.from;
    //   this.dataSize = this.size;
    //   this.dataSelected = this.rowsSelected;
    // },
  
    watch: {
      dataFrom(value) {
        this.$emit("update:from", value);
      },
      dataSize(value) {
        this.$emit("update:size", value);
      },
      dataSelected(value) {
        this.$emit("update:rowsSelected", value);
      }
    }
  }
  
  export default tableMixin;