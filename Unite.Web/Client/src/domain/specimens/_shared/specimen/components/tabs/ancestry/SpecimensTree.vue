<template>
  <div v-if="nodes">
    <q-tree :nodes="nodes" node-key="key" default-expand-all>
      <template v-slot:default-header="prop">
       <div class="row q-gutter-x-xs items-center">
          <q-icon :name="prop.node.icon" :size="prop.node.active ? 'md' : 'sm'" />
          <div :class="{ 'text-subtitle1' : prop.node.active} ">
            <span>
              <span>
                {{ prop.node.title }}
              </span>
              <span> - </span>
              <span v-if="prop.node.active">
                {{ prop.node.name }}
              </span>
              <span v-else>
                <u-link :to="{ name: prop.node.path, params: { id: prop.node.id, tab: prop.node.tab } }">
                  {{ prop.node.name }}
                </u-link>
              </span>
            </span>
            <q-badge v-if="prop.node.active && !prop.node.donor" align="top">
              This
            </q-badge>
          </div>
       </div>
      </template>

      <template v-slot:default-body="prop">
        <u-specimens-tree-donor v-if="prop.node.donor" :donor="prop.node.donor" />
        <u-specimens-tree-material v-else-if="prop.node.material" :specimen="prop.node.material" />
        <u-specimens-tree-line v-else-if="prop.node.line" :specimen="prop.node.line" />
        <u-specimens-tree-organoid v-else-if="prop.node.organoid" :specimen="prop.node.organoid" />
        <u-specimens-tree-xenograft v-else-if="prop.node.xenograft" :specimen="prop.node.xenograft" />
      </template>
    </q-tree>
  </div>
</template>

<script>
import USpecimensTreeDonor from "./SpecimensTreeDonor.vue";
import USpecimensTreeMaterial from "./SpecimensTreeMaterial.vue";
import USpecimensTreeLine from "./SpecimensTreeLine.vue";
import USpecimensTreeOrganoid from "./SpecimensTreeOrganoid.vue";
import USpecimensTreeXenograft from "./SpecimensTreeXenograft.vue";

import Settings from "@/_settings/settings";

export default {
  components: {
    USpecimensTreeDonor,
    USpecimensTreeMaterial,
    USpecimensTreeLine,
    USpecimensTreeOrganoid,
    USpecimensTreeXenograft
  },

  props: {
    donor: {
      type: Object,
      required: true
    },
    specimens: {
      type: Array,
      required: false
    },
    currentId: {
      type: [Number, null],
      default: null
    },
    currentType: {
      type: [String, null],
      default: null,
      validator: (value) => ["donor", "specimen"].includes(value)
    },
  },

  data() {
    return {
      nodes: this.buildNodes(this.donor, this.specimens),
    };
  },

  methods: {
    buildNodes(donor, specimens) {
      if(!donor || !specimens) {
        return null;
      }

      let node = {
          id: donor.id,
          name: donor.referenceId,
          title: Settings.donor.title,
          path: Settings.donor.domain,
          tab: Settings.donor.tabs.specimens.domain,
          icon: Settings.donors.icon,
          key: `d.${donor.id}`,
          active: donor.id == this.currentId && this.currentType === "donor",
          donor: donor,
          children: specimens.map(specimen => this.buildNode(specimen))
      }

      return [node];
    },

    buildNode(specimen) {
      var node = { 
        id: specimen.id,
        name: specimen.referenceId,
        key: `s.${specimen.id}`,
        active: specimen.id == this.currentId && this.currentType === "specimen",
      };
      
      if (!!specimen.material) {
        node.title = Settings.material.title;
        node.path = Settings.material.domain;
        node.tab = Settings.material.tabs.ancestry.domain;
        node.icon = Settings.materials.icon;
        node.material = specimen.material;
      } else if (!!specimen.line) {
        node.title = Settings.line.title;
        node.path = Settings.line.domain;
        node.tab = Settings.line.tabs.ancestry.domain;
        node.icon = Settings.lines.icon;
        node.line = specimen.line;
      } else if (!!specimen.organoid) {
        node.title = Settings.organoid.title;
        node.path = Settings.organoid.domain;
        node.icon = Settings.organoids.icon;
        node.tab = Settings.organoid.tabs.ancestry.domain;
        node.organoid = specimen.organoid;
      } else if (!!specimen.xenograft) {
        node.title = Settings.xenograft.title;
        node.path = Settings.xenograft.domain;
        node.icon = Settings.xenografts.icon;
        node.tab = Settings.xenograft.tabs.ancestry.domain;
        node.xenograft = specimen.xenograft;
      }

      if (specimen.children?.length > 0) {
        node.children = [];

        specimen.children.forEach(childSpecimen => {
          node.children.push(this.buildNode(childSpecimen));
        });
      }

      return node;
    },

    // findNode(nodes, key) {
    //   for (let i = 0; i < nodes.length; i++) {
    //     let node = nodes[i];
        
    //     if (node.key == key) {
    //       return node;
    //     } else if (node.children?.length > 0) {
    //       return this.findNode(node.children, key);
    //     } else {
    //       return null;
    //     }
    //   }
    // }
  }
}
</script>