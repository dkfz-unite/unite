const mixin = {
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },

  methods: {
    /**
     * Maps an object's properties into a new object, optionally omitting specific keys
     * and flattening array values into comma-separated strings.
     * @param {Record<string, any>} obj - Source object to map.
     * @param {string[]} [ignore=[]] - Keys to exclude from the result.
     * @param {string[]} [flat=[]] - Keys whose object values should be flattened into the parent object.
     * @param {string[]} [wrap=[]] - Keys whose array values should be converted to comma-separated strings.
     * @returns {Record<string, any>} A new object with mapped properties.
     */
    mapProps(obj, ignore = [], flat = [], wrap = []) {
      const mapped = {};

      Object.keys(obj).forEach(key => {
        if (ignore?.includes(key)) {
          return;
        }

        if (flat?.includes(key)) {
          if (obj[key] != null) {
            Object.keys(obj[key]).forEach(subKey => {
              mapped[subKey] = obj[key][subKey];
            });
          }
          return;
        }

        if (wrap?.includes(key)) {
          if (obj[key]?.length) {
            mapped[key] = obj[key].join(", ");
          }
          return;
        }

        mapped[key] = obj[key];
      });

      return mapped;
    }
  }
}

export default mixin;