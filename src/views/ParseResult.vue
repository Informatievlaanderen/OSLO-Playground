<template>
  <vl-grid mod-stacked>
    <vl-column>
      <vl-action-group>
        <vl-button
          :class="{'vl-button--secondary': selected === 'quads'}"
          @click="setView('quads')"
        >
          N-Quads
        </vl-button>
        <vl-button
          :class="{'vl-button--secondary': selected === 'table'}"
          @click="setView('table')"
        >
          Tabel
        </vl-button>
        <vl-button
          :class="{'vl-button--secondary': selected === 'expanded'}"
          @click="setView('expanded')"
        >
          Expanded
        </vl-button>
      </vl-action-group>
    </vl-column>
    <vl-column
      v-if="selected === 'quads'"
      width="11"
    >
      <QuadComponent :quad-string="quadString" />
    </vl-column>
    <vl-column
      v-if="selected === 'table'"
      width="11"
    >
      <TableComponent :quads="quads" />
    </vl-column>
    <vl-column
      v-if="selected === 'expanded'"
      width="11"
    >
      <ExpandedComponent :expanded="expanded" />
    </vl-column>
  </vl-grid>
</template>

<script>
    import QuadComponent from "../components/QuadComponent";
    import TableComponent from "../components/TableComponent";
    import ExpandedComponent from "../components/ExpandedComponent";

    export default {
        name: "ParseResultComponent",
        components: {ExpandedComponent, TableComponent, QuadComponent},
        props: {
            quads: {
              type: Array,
              default: null
            },
            quadString: {
              type: String,
              default: ""
            },
            expanded: {
              type: String,
              default: ""
            }
        },
        data() {
            return {
                selected: 'quads'
            }
        },
        methods: {
            setView(value) {
                this.selected = value;
            }
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
</style>
