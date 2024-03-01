import UArray from "@/_shared/components/base/Array.vue";
import ULink from "@/_shared/components/base/Link.vue";
import ULinkExternal from "@/_shared/components/base/LinkExternal.vue";
import ULinkDonor from "@/domain/donor/components/Link.vue";
import ULinkImage from "@/domain/images/_shared/image/components/Link.vue";
import ULinkMri from "@/domain/images/mri/components/Link.vue";
import ULinkSpecimen from "@/domain/specimens/_shared/specimen/components/Link.vue";
import ULinkMaterial from "@/domain/specimens/material/components/Link.vue";
import ULinkLine from "@/domain/specimens/line/components/Link.vue";
import ULinkOrganoid from "@/domain/specimens/organoid/components/Link.vue";
import ULinkXenograft from "@/domain/specimens/xenograft/components/Link.vue";
import ULinkGene from "@/domain/genome/gene/components/Link.vue";
import ULinkSsm from "@/domain/genome/variants/ssm/components/Link.vue";
import ULinkCnv from "@/domain/genome/variants/cnv/components/Link.vue";
import ULinkSv from "@/domain/genome/variants/sv/components/Link.vue";

const plugin = {
  install: (app, options) => {
    app
      .component("u-array", UArray)
      .component("u-link", ULink)
      .component("u-link-external", ULinkExternal)
      .component("u-link-donor", ULinkDonor)
      .component("u-link-image", ULinkImage)
      .component("u-link-mri", ULinkMri)
      .component("u-link-specimen", ULinkSpecimen)
      .component("u-link-material", ULinkMaterial)
      .component("u-link-line", ULinkLine)
      .component("u-link-organoid", ULinkOrganoid)
      .component("u-link-xenograft", ULinkXenograft)
      .component("u-link-gene", ULinkGene)
      .component("u-link-ssm", ULinkSsm)
      .component("u-link-cnv", ULinkCnv)
      .component("u-link-sv", ULinkSv);
  }
};

export default plugin;