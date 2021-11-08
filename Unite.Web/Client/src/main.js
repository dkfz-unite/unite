import { Quasar } from "quasar";
import quasarOptions from "./settings.quasar";
import helpers from "./_shared/plugins/helpers-plugin";
import { createApp } from "vue";
import App from "./app/App.vue";
import router from "./app/router";
import store from "./app/store";

createApp(App)
.use(Quasar, quasarOptions)
.use(helpers)
.use(store)
.use(router)
.mount('#app');
