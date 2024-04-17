import "./global.js";
import "./styles/app.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/line-awesome/line-awesome.css";

import { Quasar } from "quasar";
import quasarOptions from "./settings.quasar";
import { createApp } from "vue";
import helpers from "./_shared/plugins/helpers-plugin";
import components from "./_shared/plugins/components-plugin";
import navigator from "./_shared/plugins/navigation-plugin.js";
import router from "./home/router";
import store from "./home/store";

import UHomePage from "./home/HomePage.vue";

createApp(UHomePage)
.use(Quasar, quasarOptions)
.use(helpers)
.use(components)
.use(navigator, { router })
.use(store)
.use(router)
.mount("#app");
