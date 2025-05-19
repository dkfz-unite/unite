<template>
  <q-dialog v-model="dialog" @keyup.esc="onCancel" persistent>
    <u-download-form
      :domain="domain" 
      :data="data" 
      :loading="loading" 
      @submit="onDownload" 
      @cancel="onCancel"
    />
  </q-dialog>

  <q-btn
    label="Download"
    icon="las la-file-download"
    color="primary"
    dense flat no-caps
    @click="dialog = true">
  </q-btn>
</template>

<script>
import UDownloadForm from "@/_shared/components/download/DownloadForm.vue";

import { exportFile } from "quasar";
import VariantType from "@/domain/omics/variants/_shared/variants/models/enums/variant-type";
import Settings from "@/_settings/settings";
import projectApi from "@/domain/project/api";
import donorApi from "@/domain/donor/api";
import imageApi from "@/domain/images/_shared/image/api";
import specimenApi from "@/domain/specimens/_shared/specimen/api";
import geneApi from "@/domain/omics/gene/api";
import variantApi from "@/domain/omics/variants/_shared/variant/api";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    domain: {
      type: String,
      required: true
    }
  },

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
        const name = `${this.domain}-${this.reference}`;
        const format = "application/zip";
        const content = await this.fetchData(model, this.id);
        exportFile(`${name}.zip`, content, format);
        this.dialog = false;
      } catch(error) {
      } finally {
        this.loading = false;
      }
    },

    async onCancel() {
      this.dialog = false;
    },

    async fetchData(model, id) {
      console.log(model, id);
      
      switch (this.domain) {
        case Settings.projects.domain: return await projectApi.downloadData(id, model);
        case Settings.donors.domain: return await donorApi.downloadData(id, model);
        case Settings.mrs.domain: return await imageApi.downloadData(id, model);
        // case Settings.cts.domain: return await imageApi.downloadData(id, model);
        case Settings.materials.domain: return await specimenApi.downloadData(id, model);
        case Settings.lines.domain: return await specimenApi.downloadData(id, model);
        case Settings.organoids.domain: return await specimenApi.downloadData(id, model);
        case Settings.xenografts.domain: return await specimenApi.downloadData(id, model);
        case Settings.genes.domain: return await geneApi.downloadData(id, model);
        case Settings.sms.domain: return await variantApi.downloadData(id, VariantType.SM, model);
        case Settings.cnvs.domain: return await variantApi.downloadData(id, VariantType.CNV, model);
        case Settings.svs.domain: return await variantApi.downloadData(id, VariantType.SV, model);
        default: return null;
      }
    }
  }
};
</script>