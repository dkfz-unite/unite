const specimensTableMixin = {
  methods: {
    getSpecimenType(type) {
      switch (type) {
        case "Material": return "tissue";
        case "Line": return "cell";
        case "Organoid": return "organoid";
        case "Xenograft": return "xenograft";
        default: return null;
      }
    },

    getSpecimenTypeName(type) {
      switch (type) {
        case "Material": return "Material";
        case "Line": return "Cell Line";
        case "Organoid": return "Organoid";
        case "Xenograft": return "Xenograft";
      }
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : idhStatus;
    }
  }
}

export default specimensTableMixin;