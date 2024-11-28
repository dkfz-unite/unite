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
    <iframe v-if="meta" :src="meta" class="fit" style="border: 0px;"></iframe>

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
const timeout = 10 * 60 * 1000;

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
      banner: true,
      loading: false,
      token: null,
      meta: ""
    }
  },

  async mounted() {
    await this.load(this.data);

    window.addEventListener("visibilitychange", async (event) => {
      if (document.visibilityState != "visible") {
        this.token = setTimeout(async () => await this.unload(), timeout);
      } else {
        clearTimeout(this.token);
      }
    });

    window.addEventListener("beforeunload", async (event) => {
      await this.unload();
    });
  },

  async unmounted() {
    this.unload();
  },

  methods: {
    async load(text) {
      const localhost = window.location.host.includes("localhost:8080");
      const parts = text.split("|");
      const url = localhost ? parts[1] : parts[0];;
      
      let tries = 0;
      let token = null;

      this.loading = true;
      
      token = setInterval(async () => {
        if (tries < 20) {
          const payload = { key: this.analysis.key };
          const ready = await this.$store.dispatch("analysis/pingSCellAnalysis", payload);
          if (ready) {
            clearInterval(token);
            this.loading = false;
            this.meta = url;
          }
        } else {
          clearInterval(token);
          this.loading = false;
          this.meta = null;
        }

        tries++;
      }, 1000);
    },

    async unload() {
      const payload = { key: this.analysis.key };
      await this.$store.dispatch("analysis/stopSCellAnalysis", payload);
      this.analysis.results = null;
    },
  }
}
</script>
