<template>
  <div class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Login</div>
          <div
            v-if="providers && providers.length > 1"
            class="text-subtitle1 text-grey-8">
            Choose identity provider
          </div>
          <div class="text-subtitle1 text-grey-8">Log in to your account</div>
        </div>
        <q-tabs
          v-model="tab"
          dense
          indicator-color="parimary"
          active-color="primary"
          :class="{ hidden: providers && providers.length === 1 }"
        >
          <q-tab v-for="(provider, index) in providers"
            :key="`tab-${index}-${provider.name}`"
            :name="provider.name"
            :label="provider.title"
          />
        </q-tabs>
        <q-tab-panels v-model="tab">
          <q-tab-panel
            v-for="(provider, index) in providers"
            :key="`tabPanel-${index}-${provider.name}`"
            :name="provider.name">
            <component :is="`LoginTab${provider.name}`" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTabLDAP from "./components/LoginTabLDAP";
import LoginTabDefault from "./components/LoginTabDefault";
import { mapState } from "vuex";

export default {
  components: {
    LoginTabLDAP,
    LoginTabDefault,
  },
  data() {
    return {
      tab: '',
    };
  },

  computed: {
    ...mapState('identity', [
      'providers',
    ]),
  },

  async mounted() {
    if (!this.providers) {
      await this.$store.dispatch("identity/loadProviders");
    }
    this.tab = this.providers.reduce((a, b) => {
      const higherPrio = Math.min(a.priority, b.priority);
      switch (higherPrio) {
        case a.priority:
          return a.name;
        case b.priority:
          return b.name;
        default:
          return '';
      }
    });
  },
}
</script>