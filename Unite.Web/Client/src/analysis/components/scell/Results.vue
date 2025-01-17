<template>
  <template v-if="!loading">
    <!-- Banner -->
    <!-- <q-banner v-if="banner" class="bg-orange text-white q-mb-xs" inline-actions dense>
      Please, close this tab if you're not actively using it.
      <template v-slot:action>
        <q-btn icon="close" flat dense @click="banner = false" />
      </template>
    </q-banner> -->

    <!-- Content -->
    <iframe v-if="url" :src="url" class="fit" style="border: 0px;"></iframe>

    <!-- Message -->
    <div v-else class="fit text-center">
      No results available. Refresh the page and try again.
    </div>
  </template>

  <template v-else>
    <q-inner-loading :showing="true" label="Please wait..."></q-inner-loading>
  </template>
</template>

<script>
import Pinger from "./pinger";
const idleTimeout = 10 * 60 * 1000;
const pingTimeout = 1000;
const pingTries = 20;

export default {
  props: {
    analysis: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      banner: false,
      loading: false,
      pinger: new Pinger(),
      token: null,
      url: ""
    }
  },

  async mounted() {
    window.addEventListener("visibilitychange", async (event) => {
      if (document.visibilityState != "visible") {
        this.token = setTimeout(async () => await this.stop(), idleTimeout);
      } else {
        clearTimeout(this.token);
      }
    });

    window.addEventListener("beforeunload", async (event) => {
      await this.stop();
    });

    await this.start();
  },

  async unmounted() {
    await this.stop();
  },

  methods: {
    async start() {
      this.loading = true;
      const number = await this.$store.dispatch("analysis/viewSCellAnalysis", { key: this.analysis.key });
      const url = `/viewer/cxg${number}`;

      this.pinger.ping(url, pingTries, pingTimeout, (success) => {
        this.loading = false;
        this.url = success ? url : null;
      });
    },

    async stop() {
      const payload = { key: this.analysis.key };
      await this.$store.dispatch("analysis/stopSCellAnalysis", payload);
      this.analysis.results = null;
    },
  }
}
</script>
