<template>
  <div v-if="providers?.length" class="col q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-sm-6 col-md-4 q-gutter-md">
        <!-- Header -->
        <div class="text-center">
          <div class="text-h4">Login</div>
          <div class="text-subtitle1 text-grey-8">
            Log in to your account
          </div>
        </div>

        <q-tabs
          v-model="tab"
          v-show="providers.length > 1"
          indicator-color="parimary" active-color="primary" dense>
          <q-tab v-for="provider in providers" :name="provider.name" :label="provider.label"/>
        </q-tabs>

        <q-tab-panels v-model="tab">
          <q-tab-panel v-for="(provider) in providers" :name="provider.name">
            <u-login-tab-default v-if="provider.name === 'default'" />
            <u-login-tab-ldap v-else-if="provider.name === 'ldap'" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import ULoginTabDefault from "./components/LoginTabDefault";
import ULoginTabLdap from "./components/LoginTabLdap";
import { mapState } from "vuex";

export default {
  components: {
    ULoginTabDefault,
    ULoginTabLdap
  },

  data() {
    return {
      tab: null
    };
  },

  computed: {
    ...mapState("identity", ["providers"]),
  },

  async mounted() {
    if (!this.providers) {
      await this.$store.dispatch("identity/loadProviders");
    }

    this.tab = this.providers[0].name;
    
    // this.tab = this.providers.reduce((a, b) => {
    //   const higherPrio = Math.min(a.priority, b.priority);
    //   switch (higherPrio) {
    //     case a.priority:
    //       return a.name;
    //     case b.priority:
    //       return b.name;
    //     default:
    //       return "";
    //   }
    // });
  }
}
</script>
