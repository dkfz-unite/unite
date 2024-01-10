const specimensTableMixin = {
  methods: {
    getSpecimenType(type) {
      switch (type) {
        case "Tissue": return "tissue";
        case "CellLine": return "cell";
        case "Organoid": return "organoid";
        case "Xenograft": return "xenograft";
        default: return null;
      }
    },

    getSpecimenTypeName(type) {
      switch (type) {
        case "Tissue": return "Tissue";
        case "CellLine": return "Cell Line";
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