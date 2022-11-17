<template>
  <div v-if="nodes">
    <q-tree
      :nodes="nodes"
      node-key="key"
      default-expand-all
    >
      <template v-slot:default-header="prop">
       <div class="row q-gutter-x-xs items-center">
          <q-icon :name="getIcon(prop.node)" :size="getIconSize(prop.node)" />
          <div :class="{ 'text-subtitle1' : prop.node.active} ">
            <span>
              <span>
                {{getName(prop.node)}}
              </span>
              <span v-if="prop.node.active">
                ({{getLinkName(prop.node)}})
              </span>
              <span v-else>
                (<router-link class="u-link" :to="getLinkAddress(prop.node)">{{getLinkName(prop.node)}}</router-link>)
              </span>
            </span>
            <q-badge v-if="prop.node.active && !prop.node.donor" align="top">This</q-badge>
          </div>
       </div>
      </template>

      <template v-slot:default-body="prop">
        <u-specimens-tree-donor v-if="prop.node.donor" :donor="prop.node.donor" />
        <u-specimens-tree-tissue v-else-if="prop.node.tissue" :tissue="prop.node.tissue" />
        <u-specimens-tree-cell v-else-if="prop.node.cellLine" :cellLine="prop.node.cellLine" />
        <u-specimens-tree-organoid v-else-if="prop.node.organoid" :organoid="prop.node.organoid" />
        <u-specimens-tree-xenograft v-else-if="prop.node.xenograft" :xenograft="prop.node.xenograft" />
      </template>
    </q-tree>
  </div>
</template>

<script>
import USpecimensTreeDonor from './SpecimensTreeDonor.vue';
import USpecimensTreeTissue from './SpecimensTreeTissue.vue';
import USpecimensTreeCell from './SpecimensTreeCell.vue';
import USpecimensTreeOrganoid from './SpecimensTreeOrganoid.vue';
import USpecimensTreeXenograft from './SpecimensTreeXenograft.vue';

export default {
  components: {
    USpecimensTreeDonor,
    USpecimensTreeTissue,
    USpecimensTreeCell,
    USpecimensTreeOrganoid,
    USpecimensTreeXenograft
  },

  props: {
    type: {
      type: String,
      default: null,
      required: true,
      validator(value) {
        return ["donor", "specimen"].includes(value);
      }
    },
    donor: Object,
    specimens: Array,
    current: Number
  },

  data() {
    return {
      nodes: this.buildNodes(this.donor, this.specimens, this.current, this.type),
    };
  },

  methods: {
    getName(node) {
      if (!!node?.donor) {
        return "Donor";
      } else if (!!node?.tissue) {
        return "Tissue";
      } else if (!!node?.cellLine) {
        return "Cell Line";
      } else if (!!node?.organoid) {
        return "Organoid";
      } else if (!!node?.xenograft) {
        return "Xenograft";
      } 
    },

    getLinkAddress(node) {
      let params = { id: node.id.toString(), tab: !!node?.donor ? "specimens" : "ancestry" };

      if (!!node?.donor) {
        return { name: 'donor', params: params};
      } else if (!!node?.tissue) {
        return { name: 'tissue', params: params};
      } else if (!!node?.cellLine) {
        return { name: 'cell', params: params};
      } else if (!!node?.organoid) {
        return { name: 'organoid', params: params};
      } else if (!!node?.xenograft) {
        return { name: 'xenograft', params: params};
      }
    },

    getLinkName(node) {
      if (!!node?.donor) {
        return node.donor.referenceId;
      } else if (!!node?.tissue) {
        return node.tissue.referenceId;
      } else if (!!node?.cellLine) {
        return node.cellLine.referenceId;
      } else if (!!node?.organoid) {
        return node.organoid.referenceId;
      } else if (!!node?.xenograft) {
        return node.xenograft.referenceId;
      }
    },

    getIcon(node) {
      if (!!node?.donor) {
        return "las la-user-circle";
      } else if (!!node?.tissue) {
        return "svguse:/icons.svg#u-tissue";
      } else if (!!node?.cellLine) {
        return "las la-microscope";
      } else if (!!node?.organoid) {
        return "svguse:/icons.svg#u-organoid";
      } else if (!!node?.xenograft) {
        return "svguse:/icons.svg#u-mouse";
      }
    },

    getIconSize(node) {
      if (node?.active) {
        return "md";
      } else {
        return "sm";
      }
    },

    buildNodes(donor, specimens, current, type) {
      if(!donor || !specimens) {
        return null;
      }

      let node = {
          id: donor.id,
          key: `d.${donor.id}`,
          active: donor.id == current && type === "donor",
          donor: donor,
          children: specimens.map(specimen => this.buildNode(specimen, current, type))
      }

      return [node];
    },

    buildNode(specimen, current, type) {
      var node = { 
        id: specimen.id, 
        key: `s.${specimen.id}`,
        active: specimen.id == current && type === "specimen",
      };
      
      if (!!specimen.tissue) {
        node.tissue = specimen.tissue;
      } else if (!!specimen.cellLine) {
        node.cellLine = specimen.cellLine;
      } else if (!!specimen.organoid) {
        node.organoid = specimen.organoid;
      } else if (!!specimen.xenograft) {
        node.xenograft = specimen.xenograft;
      }

      if (specimen.children?.length > 0) {
        node.children = [];

        specimen.children.forEach(childSpecimen => {
          node.children.push(this.buildNode(childSpecimen, current, type));
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