import { Quasar } from "quasar";
import quasarOptions from "./settings.quasar";
import helpers from "./_shared/plugins/helpers-plugin";
import { createApp } from "vue";
import HomePage from "./home/HomePage.vue";
import router from "./home/router";
import store from "./home/store";

import ULink from "./_shared/components/base/Link.vue";
import ULinkExternal from "./_shared/components/base/LinkExternal.vue";
import UArray from "./_shared/components/base/Array.vue";
import "./styles/app.scss"

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'

createApp(HomePage)
.use(Quasar, quasarOptions)
.use(helpers)
.use(store)
.use(router)
.component("u-link", ULink)
.component("u-link-external", ULinkExternal)
.component("u-array", UArray)
.mount('#app');
