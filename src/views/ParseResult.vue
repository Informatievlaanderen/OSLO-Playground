<template>
    <vl-grid mod-stacked>
        <vl-column>
            <vl-action-group>
                <vl-button v-bind:class="{'vl-button--secondary': selected === 'quads'}" @click="setView('quads')">N-Quads</vl-button>
                <vl-button v-bind:class="{'vl-button--secondary': selected === 'table'}" @click="setView('table')">Tabel</vl-button>
                <vl-button v-bind:class="{'vl-button--secondary': selected === 'table'}" @click="setView('table')">Expanded</vl-button>
                <vl-button v-bind:class="{'vl-button--secondary': selected === 'table'}" @click="setView('table')">Tabel</vl-button>
            </vl-action-group>
        </vl-column>
        <vl-column v-if="selected === 'quads'" width="11">
            <QuadComponent v-bind:quadString="quadString"/>
        </vl-column>
        <vl-column v-if="selected === 'table'" width="11">
            <TableComponent v-bind:quads="quads"/>
        </vl-column>
    </vl-grid>
</template>

<script>
    import QuadComponent from "../components/QuadComponent";
    import TableComponent from "../components/TableComponent";

    export default {
        name: "ParseResultComponent",
        components: {TableComponent, QuadComponent},
        props: {
            quads: Array,
            quadString: String
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
