const specimensTableMixin = {
  methods: {
    getSpecimenLink(specimen) {
      if (!specimen) {
        return null;
      } else if (!!specimen.tissue) {
        return { name: "tissue", params: { id: specimen.id.toString() }}
      } else if (!!specimen.cellLine) {
        return { name: "cell", params: { id: specimen.id.toString() }}
      } else if (!!specimen.organoid) {
        return { name: "organoid", params: { id: specimen.id.toString() }}
      } else if (!!specimen.xenograft) {
        return { name: "xenograft", params: { id: specimen.id.toString() }}
      } else {
        return null;
      }
    },

    getSpecimenTypeName(specimen) {
      if (!specimen) {
        return null;
      } else if (!!specimen.tissue) {
        return `Tissue (${specimen.tissue.tumorType ?? specimen.tissue.type})`;
      } else if (!!specimen.cellLine) {
        return "Cell Line"
      } else if (!!specimen.organoid) {
        return "Organoid"
      } else if (!!specimen.xenograft) {
        return "Xenograft"
      } else {
        return null;
      }
    },

    getIdh(idhStatus, idhMutation) {
      return !!idhMutation ? idhMutation : idhStatus;
    }
  }
}

export default specimensTableMixin;