const mixing = {
  methods: {
    dataView(value) {
      return this.$helpers.content.toBooleanString(value, false, "V", "--");
    },

    dataCellClass(value) {
      return value ? "text-bold text-green-6" : "text-bold text-grey-6";
    },

    dataHeaderClass() {
      return "bg-blue-grey-1";
    }
  }
};

export default mixing;