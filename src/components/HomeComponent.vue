<template>
    <div>
        <vl-region>
            <vl-layout>
                <vl-grid>
                    <vl-column width="8">
                        <vl-introduction>
                            Deze playground van Informatie Vlaanderen is een eigen implementatie van de reeds bestaandse
                            JSON-LD
                            Playground.
                            Ga aan de slag met je eigen JSON-LD data of gebruik één van de voorbeelden die beschikbaar
                            zijn.
                        </vl-introduction>
                    </vl-column>
                    <vl-column width="3">
                        <vl-side-navigation class="example-sticky" title="Zie ook">
                            <vl-side-navigation-list>
                                <vl-side-navigation-item href="https://data.vlaanderen.be/shacl-validator/"
                                                         text="OSLO Validator"/>
                                <vl-side-navigation-item href="https://data.vlaanderen.be" text="URI Validator"/>
                            </vl-side-navigation-list>
                        </vl-side-navigation>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>

        <vl-region>
            <vl-layout>
                <vl-grid mod-stacked>
                    <vl-column>
                        <vl-action-group>
                            <vl-button v-if="action === 'parsing'" mod-tertiary>JSON-LD parsing</vl-button>
                            <vl-button @click="setAction('parsing')" v-else>JSON-LD Parsing</vl-button>
                            <vl-button v-if="action === 'shacl'" mod-tertiary>SHACL validatie</vl-button>
                            <vl-button @click="setAction('shacl')" v-else>SHACL validatie</vl-button>
                        </vl-action-group>
                    </vl-column>
                    <vl-column v-if="action === 'parsing'">
                        <ParseComponent/>
                    </vl-column>
                    <vl-column v-if="action === 'shacl'">
                        <ShaclComponent/>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
    </div>
</template>

<script>
    import ParseComponent from "./ParseComponent";
    import ShaclComponent from "./ShaclComponent";

    export default {
        name: "HomeComponent",
        components: {ShaclComponent, ParseComponent},
        data() {
            return {
                action: 'parsing'
            }
        },
        methods: {
            setAction(value) {
                this.action = value;
            }
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-introduction/src/scss/introduction";
    @import "~@govflanders/vl-ui-side-navigation/src/scss/side-navigation";
    @import "~@govflanders/vl-ui-action-group/src/scss/action-group";
    @import "~@govflanders/vl-ui-button/src/scss/button";
</style>
