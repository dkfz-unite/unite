const specimensTableMixin = {
  methods: {
    getSpecimenType(specimen) {
      if (!!specimen?.tissue) return "tissue";
      else if (!!specimen?.cellLine) return "cell";
      else if (!!specimen?.organoid) return "organoid";
      else if (!!specimen?.xenograft) return "xenograft";
      else null;
    },

    getSpecimenTypeName(specimen) {
      if (!!specimen?.tissue) return `Tissue (${specimen.tissue.tumorType ?? specimen.tissue.type})`;
      else if (!!specimen?.cellLine) return "Cell Line";
      else if (!!specimen?.organoid) return "Organoid";
      else if (!!specimen?.xenograft) return "Xenograft";
      else null;
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : idhStatus;
    }
  }
}

export default specimensTableMixin;