<template>
  <q-dialog v-model="dialog" @keyup.esc="onCancel" persistent>
    <u-download-form :domain="domain?.name" :data="cohort?.data" :loading="loading" @submit="onDownload" @cancel="onCancel" />
  </q-dialog>

  <q-btn
    :class="class"
    label="Download"
    icon="las la-file-download"
    color="secondary"
    dense flat no-caps
    @click="dialog = true">
  </q-btn>
</template>

<script>
import { exportFile } from "quasar";
import UDownloadForm from "@/_shared/components/download/DownloadForm.vue";
import DomainNames from "@/_models/domain/domain-names";
import ImageTypes from "@/_models/domain/images/image-types";
import SpecimenTypes from "@/_models/domain/specimens/specimen-types";
import VariantTypes from "@/_models/domain/genome/variants/variant-types";
import donorsApi from "@/domain/donors/api";
import imagesApi from "@/domain/images/_shared/api/images";
import specimensApi from "@/domain/specimens/_shared/api/specimens";
import genesApi from "@/domain/genome/genes/api";
import variantsApi from "@/domain/genome/variants/_shared/api/variants";

export default {
  props: ["domain", "cohort", "class"],

  components: {
    UDownloadForm
  },

  data() {
    return {
      dialog: false,
      loading: false
    };
  },

  methods: {
    async onDownload(model) {
      try {
        this.loading = true;
        const name = this.cohort.name.split(" ").join("_");
        const format = "application/zip";
        const content = await this.fetchData(model, this.cohort.criteria);
        exportFile(`${name}.zip`, content, format);
        this.dialog = false;
      } catch {
        // Do nothing
      } finally {
        this.loading = false;
      }
    },

    async onCancel() {
      this.dialog = false;
    },

    async fetchData(model, criteria) {
      switch (this.domain?.name) {
        case DomainNames.Donors: return await donorsApi.data(model, criteria);
        case DomainNames.Mris: return await imagesApi.data(ImageTypes.Mri, model, criteria);
        // case DomainNames.Cts: return await imagesApi.data(ImageType.Ct, model, criteria);
        case DomainNames.Tissues: return await specimensApi.data(SpecimenTypes.Tissue, model, criteria);
        case DomainNames.Cells: return await specimensApi.data(SpecimenTypes.CellLine, model, criteria);
        case DomainNames.Organoids: return await specimensApi.data(SpecimenTypes.Organoid, model, criteria);
        case DomainNames.Xenografts: return await specimensApi.data(SpecimenTypes.Xenograft, model, criteria);
        case DomainNames.Genes: return await genesApi.data(model, criteria)
        case DomainNames.Ssms: return await variantsApi.data(VariantTypes.SSM, model, criteria);
        case DomainNames.Cnvs: return await variantsApi.data(VariantTypes.CNV, model, criteria);
        case DomainNames.Svs: return await variantsApi.data(VariantTypes.SV, model, criteria);
        default: return null;
      }
    }
  }
};
</script>