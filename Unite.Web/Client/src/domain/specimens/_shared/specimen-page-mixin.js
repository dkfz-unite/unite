import specimenApi from "./api/specimen";
import donorApi from "@/domain/donor/api";

import Permissions from "@/_models/admin/enums/permissions";

const mixin = {
  data() {
    return {
      loading: false,
      specimen: null,
      donor: null
    };
  },

  computed: {
    account() {
      return this.$store.state.identity.account;
    },

    canUpload() {
      return this.account.hasPermission(Permissions.Data.Write);
    },

    showDrugs() {
      return !!this.specimen?.numberOfDrugs;
    },

    showGenes() {
      return !!this.specimen?.numberOfGenes;
    },

    showVariants() {
      return !!this.specimen?.numberOfMutations
          || !!this.specimen?.numberOfCopyNumberVariants
          || !!this.specimen?.numberOfStructuralVariants;
    },

    showMutations() {
      return !!this.specimen?.numberOfMutations;
    },

    showCopyNumberVariants() {
      return !!this.specimen?.numberOfCopyNumberVariants;
    },

    showStructuralVariants() {
      return !!this.specimen?.numberOfStructuralVariants;
    },

    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "ancestry" ? "Ancestry"
           : this.tab === "interventions" ? "Interventions"
           : this.tab === "drugs" ? "Drugs"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    },

    variantTab() {
      return this.tab === "ssms" ? "ssms"
           : this.tab === "cnvs" ? "cnvs"
           : this.tab === "svs" ? "svs"
           : null;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.specimen = await specimenApi.get(this.$route.params.id);
      this.donor = await donorApi.get(this.specimen.donorId);
    } catch (error) {
      this.specimen = null;
      this.donor = null;
    } finally {
      this.loading = false;
    }
  }
}

export default mixin;