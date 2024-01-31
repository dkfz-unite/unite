import DomainNames from "@/_settings/domain-names";
import Permissions from "@/_models/admin/enums/permissions";

import specimenApi from "./api/specimen";
import donorApi from "@/domain/donor/api";

const mixin = {

  data() {
    return {
      DomainNames,

      loading: false,
      specimen: null,
      donor: null,
      samples: null,
    };
  },

  computed: {
    account() {
      return this.$store.state.identity.account;
    },

    canUpload() {
      return this.account.hasPermission(Permissions.Data.Write);
    },

    showInterventions() {
      return this.specimen?.data?.interventions;
    },

    showDrugs() {
      return this.specimen?.data?.drugs;
    },

    showProfile() {
      return this.specimen?.data?.ssms || this.specimen?.data?.cnvs || this.specimen?.data?.svs || this.specimen?.data?.geneExp;
    },

    showGenes() {
      return this.specimen?.numberOfGenes || this.specimen?.data?.geneExp;
    },

    showVariants() {
      return this.showSsms || this.showCnvs || this.showSvs;
    },

    showSsms() {
      return !!this.specimen?.numberOfSsms;
    },

    showCnvs() {
      return !!this.specimen?.numberOfCnvs;
    },

    showSvs() {
      return !!this.specimen?.numberOfSvs;
    },

    tabName() {
      return this.tab === "summary" ? "Summary"
           : this.tab === "ancestry" ? "Ancestry"
           : this.tab === "interventions" ? "Interventions"
           : this.tab === "drugs" ? "Drugs"
           : this.tab === "profile" ? "Profile"
           : this.tab === "genes" ? "Genes"
           : this.tab === "ssms" ? "SSMs"
           : this.tab === "cnvs" ? "CNVs"
           : this.tab === "svs" ? "SVs"
           : this.tab;
    }
  },

  async mounted() {
    try {
      this.loading = true;
      this.specimen = await specimenApi.get(this.$route.params.id);
      this.samples = [this.specimen.sample];
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