import "./global.js";
import "./styles/app.scss";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/line-awesome/line-awesome.css";

import { Quasar } from "quasar";
import quasarOptions from "./settings.quasar";
import { createApp } from "vue";
import helpers from "./_shared/plugins/helpers-plugin";
import router from "./home/router";
import store from "./home/store";

import HomePage from "./home/HomePage.vue";
import ULink from "./_shared/components/base/Link.vue";
import ULinkExternal from "./_shared/components/base/LinkExternal.vue";
import UArray from "./_shared/components/base/Array.vue";
import ULinkDonor from "./domain/donor/components/DonorLink.vue";
import ULinkSpecimen from "./domain/specimens/_shared/specimen/components/SpecimenLink.vue";
import ULinkMaterial from "./domain/specimens/tissue/components/MaterialLink.vue";
import ULinkLine from "./domain/specimens/cell/components/LineLink.vue";
import ULinkOrganoid from "./domain/specimens/organoid/components/OrganoidLink.vue";
import ULinkXenograft from "./domain/specimens/xenograft/components/XenograftLink.vue";
import ULinkGene from "./domain/genome/gene/components/GeneLink.vue";

createApp(HomePage)
.use(Quasar, quasarOptions)
.use(helpers)
.use(store)
.use(router)
.component("u-array", UArray)
.component("u-link", ULink)
.component("u-link-external", ULinkExternal)
.component("u-link-donor", ULinkDonor)
.component("u-link-specimen", ULinkSpecimen)
.component("u-link-material", ULinkMaterial)
.component("u-link-line", ULinkLine)
.component("u-link-organoid", ULinkOrganoid)
.component("u-link-xenograft", ULinkXenograft)
.component("u-link-gene", ULinkGene)
.mount("#app");
