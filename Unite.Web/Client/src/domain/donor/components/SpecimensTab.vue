<template>
  <div class="col q-gutter-y-sm">
    <div class="row">
      <div class="col-12">
        <u-ancestry v-if="donor && specimens" 
          title="Specimens"
          :donor="donor"
          :specimens="specimens"
          :currentId="donor.id"
          :currentType="'donor'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UAncestry from "@/domain/specimens/_shared/specimen/components/ancestry/Ancestry.vue";

import api from "../api";

export default {
  components: {
    UAncestry
  },

  props: {
    donor: Object
  },

  data() {
    return {
      specimens: null
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        let data = await api.searchSpecimens(this.donor.id, { from: 0, size: 1000 });
        this.specimens = this.buildNodes(null, data.rows);
      } catch(error) {
        this.specimens = null;
      }
    },

    buildNodes(nodes, allNodes) {
      nodes = nodes || allNodes.filter(node => !node.parentId).map(node => this.copyNode(node));

      for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];

        let childNodes = allNodes
          .filter(node => node.parentId == currentNode.id)
          .map(node => this.copyNode(node));

        if (childNodes?.length) {
          this.buildNodes(childNodes, allNodes);
          currentNode.children = childNodes;
        }
      }

      return nodes;
    },

    copyNode(node) {
      return JSON.parse(JSON.stringify(node));
    }
  }
}
</script>