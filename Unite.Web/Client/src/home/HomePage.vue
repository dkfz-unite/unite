<template>
  <q-layout view="hHh lpr fFf">

    <q-header bordered class="bg-blue-7 text-white">
      <q-toolbar>
        <div class="col">
          <div class="row justify-between">
            <!-- Top left corner placeholder -->
            <div id="top-left-placeholder" v-if="$q.screen.lt.md">
            </div>

            <!-- Logo -->
            <div>
              <u-logo />
            </div>

            <!-- Top right corner placeholder -->
            <div id="top-right-placeholder" class="q-gutter-x-sm">
              <u-menu-button v-if="account" />
            </div>
          </div>
        </div>
      </q-toolbar>

      <!-- Navigation -->
      <u-navigation v-if="account" />
    </q-header>

    <q-page-container>
      <div class="q-px-md q-py-sm">
        <router-view v-if="authorized" />
      </div>
    </q-page-container>

    <q-footer bordered>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import ULogo from "./components/header/Logo.vue";
import UNavigation from "./components/header/navigation/Navigation.vue";
import UMenuButton from "./components/header/menu/MenuButton.vue";

export default {
  components: {
    ULogo,
    UNavigation,
    UMenuButton,
  },

  computed: {
    ...mapState("identity", ["account"]),

    authorized() {
      const route = this.$route;

      if (route.meta?.authorize){
        return this.account != null;
      } else if (route.meta?.anonymous) {
        return this.account == null;
      } else {
        return true;
      }
    }
  },

  watch: {
    account(value) {
      if (value) {
        this.loadAll();
      }
    }
  },

  mounted() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.changeState(false);
      } else if (document.visibilityState === "visible") {
        this.changeState(true);
      }
    });

    window.addEventListener("blur", () => {
      this.changeState(false);
    });

    window.addEventListener("focus", () => {
      if (document.visibilityState === "visible") {
        this.changeState(true);
      }
    });
  },

  methods: {
    ...mapActions("datasets", ["loadAll"]),

    changeState(value) {
      if (this.$store.state.visible != value) {
        this.$store.state.visible = value;
      }
    }
  }
}
</script>
