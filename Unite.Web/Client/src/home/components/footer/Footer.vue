<template>
  <q-footer v-if="show()" bordered class="bg-white text-grey-8">
    <div class="row justify-end items-center q-px-md q-py-sm q-gutter-x-md text-caption">
      <a v-if="config.legalNoticeUrl" :href="config.legalNoticeUrl" class="u-link" target="_blank" rel="noopener noreferrer">
        Legal Notice
      </a>
      <a v-if="config.privacyPolicyUrl" :href="config.privacyPolicyUrl" class="u-link" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </a>
    </div>
  </q-footer>
</template>

<script>
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();

export default {
  data() {
    return {
      config: null
    };
  },

  async mounted() {
    try {
      this.config = await client.get("/api/config");
    } catch (error) {
      console.error("Could not load public configuration.", error);
    }
  },

  methods: {
    show() {
      return this.config && (this.config.legalNoticeUrl || this.config.privacyPolicyUrl);
    }
  }
}
</script>
