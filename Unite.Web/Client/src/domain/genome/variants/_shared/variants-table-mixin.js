const mixin = {
    methods: {
      // getVariantLink(variant) {
      //   if (!variant) {
      //     return null;
      //   } else if (!!variant.mutation) {
      //     return { name: "ssm", params: { id: variant.id.toString() } }
      //   } else if (!!variant.copyNumberVariant) {
      //     return { name: "cnv", params: { id: variant.id.toString() } }
      //   } else if (!!variant.structuralVariant) {
      //     return { name: "sv", params: { id: variant.id.toString() } }
      //   } else {
      //     return null;
      //   }
      // },
  
      // getVariantTypeName(specimen) {
      //   if (!specimen) {
      //     return null;
      //   } else if (!!specimen.tissue) {
      //     return `Tissue (${specimen.tissue.tumorType ?? specimen.tissue.type})`;
      //   } else if (!!specimen.cellLine) {
      //     return "Cell Line"
      //   } else if (!!specimen.organoid) {
      //     return "Organoid"
      //   } else if (!!specimen.xenograft) {
      //     return "Xenograft"
      //   } else {
      //     return null;
      //   }
      // },
  
      // getIdh(idhStatus, idhMutation) {
      //   return !!idhMutation ? idhMutation : idhStatus;
      // }
    }
  }
  
  export default mixin;