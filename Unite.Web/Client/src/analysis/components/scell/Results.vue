<template>
  <template v-if="!loading">
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
const idleTimeout = 10 * 1000;
const pingTimeout = 1000;
const pingTries = 20;

export default {
  props: {
    id: {
      type: String,
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
      loading: false,
      pinger: new Pinger(),
      token: null,
      url: null
    }
  },

  computed: {
    visible() {
      return this.$store.state.visible;
    }
  },

  watch: {
    async visible(value) {
      if (value) {
        this.startUpdating();
      } else {
        this.stopUpdating();
      }
    },

    async data(value) {
      await this.init();
    }
  },

  async mounted() {
    await this.init();
  },

  async unmounted() {
    await this.stopUpdating();
  },

  methods: {
    async init() {
      await this.start();
    },

    async start() {
      this.url = null;
      this.loading = true;
      const number = await this.$store.dispatch("analysis/viewScellAnalysis", { id: this.id });
      const url = `/viewer/cxg${number}/`;

      this.pinger.ping(url, pingTries, pingTimeout, (success) => {
        this.loading = false;
        if (success) {
          this.url = url;
          this.startUpdating();
        }
      });
    },

    async update() {
      const payload = { id: this.id };
      return await this.$store.dispatch("analysis/updateScellAnalysis", payload);
    },

    async startUpdating() {
      this.stopUpdating();

      const success = await this.update();

      if (success) {        
        this.token = setInterval(async () => await this.update(), idleTimeout);
      } else {
        this.url = null;
      }
    },

    async stopUpdating() {
      if (this.token) clearInterval(this.token);
    }
  }
}
</script>
