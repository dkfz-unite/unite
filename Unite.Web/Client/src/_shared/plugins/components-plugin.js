import UArray from "@/_shared/components/base/Array.vue";
import ULink from "@/_shared/components/base/Link.vue";
import ULinkExternal from "@/_shared/components/base/LinkExternal.vue";
import ULinkProject from "@/domain/project/components/Link.vue";
import ULinkDonor from "@/domain/donor/components/Link.vue";
import ULinkImage from "@/domain/images/_shared/image/components/Link.vue";
import ULinkMr from "@/domain/images/mr/components/Link.vue";
import ULinkSpecimen from "@/domain/specimens/_shared/specimen/components/Link.vue";
import ULinkMaterial from "@/domain/specimens/material/components/Link.vue";
import ULinkLine from "@/domain/specimens/line/components/Link.vue";
import ULinkOrganoid from "@/domain/specimens/organoid/components/Link.vue";
import ULinkXenograft from "@/domain/specimens/xenograft/components/Link.vue";
import ULinkGene from "@/domain/omics/gene/components/Link.vue";
import ULinkSm from "@/domain/omics/variants/sm/components/Link.vue";
import ULinkCnv from "@/domain/omics/variants/cnv/components/Link.vue";
import ULinkSv from "@/domain/omics/variants/sv/components/Link.vue";

const plugin = {
  install: (app, options) => {
    app
      .component("u-array", UArray)
      .component("u-link", ULink)
      .component("u-link-external", ULinkExternal)
      .component("u-link-project", ULinkProject)
      .component("u-link-donor", ULinkDonor)
      .component("u-link-image", ULinkImage)
      .component("u-link-mr", ULinkMr)
      .component("u-link-specimen", ULinkSpecimen)
      .component("u-link-material", ULinkMaterial)
      .component("u-link-line", ULinkLine)
      .component("u-link-organoid", ULinkOrganoid)
      .component("u-link-xenograft", ULinkXenograft)
      .component("u-link-gene", ULinkGene)
      .component("u-link-sm", ULinkSm)
      .component("u-link-cnv", ULinkCnv)
      .component("u-link-sv", ULinkSv);
  }
};

export default plugin;