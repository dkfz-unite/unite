<template>
  <div v-if="nodes">
    <q-tree
      :nodes="nodes"
      node-key="key"
      default-expand-all
    >
      <template v-slot:default-header="prop">
       <div class="row q-gutter-x-xs">
          <q-icon :name="getIcon(prop.node)" :size="getIconSize(prop.node)" />
          <div :class="{ 'text-subtitle1 text-bold' : prop.node.active} ">
            <span>
              ID: <router-link class="u-link" :to="getLink(prop.node)">{{prop.node.id}}</router-link>
            </span>
             - {{getName(prop.node)}}
            <q-badge v-if="prop.node.active && !prop.node.donor" align="top">this specimen</q-badge>
          </div>
       </div>
      </template>

      <template v-slot:default-body="prop">
        <div class="row" v-if="!(prop.node.active && prop.node.donor)">
          <q-card bordered :flat="!prop.node.active">
            <q-card-section class="q-pa-sm">
              <div class="row q-gutter-x-sm" :class="{ 'text-caption': !prop.node.active, 'text-body2 text-grey-5': prop.node.active }">
                <template v-if="!!prop.node.donor">
                  <div v-if="!!prop.node.donor.clinicalData">
                    <span>Diagnosis: </span>
                    <span class="text-grey-9">{{prop.node.donor.clinicalData.diagnosis}}</span>
                  </div>
                </template>
                <template v-else-if="!!prop.node.tissue">
                  <div>
                    <span>Type: </span>
                    <span class="text-grey-9">{{prop.node.tissue.tumourType}} {{prop.node.tissue.type}}</span>
                  </div>
                </template>
                <template v-else-if="!!prop.node.cell">
                  <div>
                    <span>Species: </span>
                    <span class="text-grey-9">{{prop.node.cell.species}}</span>
                  </div>
                  <div>
                    <span>Type: </span>
                    <span class="text-grey-9">{{prop.node.cell.type}}</span>
                  </div>
                </template>
              </div>
            </q-card-section>
          </q-card>
          </div>
      </template>
    </q-tree>
  </div>
</template>

<script>
export default {
  props: ['donor', 'specimens', 'current'],

  data() {
    return {
      nodes: this.buildNodes(this.donor, this.specimens, this.current),
      // selected: this.value ?? null
    }
  },

  // watch: {
  //   selected(value) {
  //     let node = this.findNode(this.nodes, value);
  //     this.$emit('input', node);
  //   }
  // },

  methods: {
    getName(node) {
      if (!!node?.donor) {
        return "Donor";
      } else if (!!node?.tissue) {
        return "Tissue";
      } else if (!!node?.cell) {
        return "Cell Line";
      }
    },

    getLink(node) {
      let params = { id: node.id.toString() };

      if (!!node?.donor) {
        return { name: 'donor', params: params};
      } else if (!!node?.tissue) {
        return { name: 'tissue', params: params};
      } else if (!!node?.cell) {
        return { name: 'cell', params: params};
      }
    },

    getIcon(node) {
      if (!!node?.donor) {
        return "las la-user-circle";
      } else if (!!node?.tissue) {
        return "svguse:/icons.svg#u-tissue";
      } else if (!!node?.cell) {
        return "las la-microscope";
      }
    },

    getIconSize(node) {
      if (node?.active) {
        return "md";
      } else {
        return "sm";
      }
    },

    buildNodes(donor, specimens, current) {
      if(!donor || !specimens) {
        return null;
      }

      let node = {
          id: donor.id,
          key: `d.${donor.id}`,
          active: donor.id == current,
          donor: donor,
          children: specimens.map(specimen => this.buildNode(specimen, current))
      }

      return [node].sort(this.compareNodes);
    },

    buildNode(specimen, current) {
      var node = { 
        id: specimen.id, 
        key: `s.${specimen.id}`,
        active: specimen.id == current,
        molecularData: specimen.molecularData
      };
      
      if (!!specimen.tissue) {
        node.tissue = specimen.tissue;
      } else if (!!specimen.cellLine) {
        node.cell = specimen.cellLine;
      }

      if (specimen.children?.length > 0) {
        node.children = [];

        specimen.children.forEach(childSpecimen => {
          node.children.push(this.buildNode(childSpecimen));
        });
      }

      if (!specimen.parent) {
        return node;
      } else {
        let parentNode = this.buildNode(specimen.parent);
        parentNode.children = [node];

        return parentNode;
      }
    },

    findNode(nodes, key) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        
        if (node.key == key) {
          return node;
        } else if (node.children?.length > 0) {
          return this.findNode(node.children, key);
        } else {
          return null;
        }
      }
    }
  }
};
</script>