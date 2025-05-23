import { mapGetters } from "vuex";
import specimenApi from "./api";
import donorApi from "@/domain/donor/api";

const mixin = {
  data() {
    return {
      loading: false,
      specimen: null,
      donor: null,
      samples: null,
    };
  },

  computed: {
    ...mapGetters("identity", ["canWriteData"]),

    showInterventions() {
      return this.specimen?.data?.interventions;
    },

    showDrugs() {
      return this.specimen?.data?.drugs;
    },

    showProfile() {
      return this.specimen?.data?.sms || this.specimen?.data?.cnvs || this.specimen?.data?.svs || this.specimen?.data?.exp;
    },

    showGenes() {
      return this.specimen?.numberOfGenes || this.specimen?.data?.exp;
    },

    showVariants() {
      return this.showSms || this.showCnvs || this.showSvs;
    },

    showSms() {
      return !!this.specimen?.numberOfSms;
    },

    showCnvs() {
      return !!this.specimen?.numberOfCnvs;
    },

    showSvs() {
      return !!this.specimen?.numberOfSvs;
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