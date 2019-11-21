<template>
    <vl-layout>
        <vl-grid>
            <vl-column width="7">
                <vl-introduction>
                    Deze playground van Informatie Vlaanderen is een eigen implementatie van de reeds bestaandse JSON-LD
                    Playground.
                    Ga aan de slag met je eigen JSON-LD data of gebruik één van de voorbeelden die beschikbaar
                    zijn.
                </vl-introduction>
            </vl-column>
            <vl-column width="4">
                <vl-side-navigation class="example-sticky" title="Tools">
                    <vl-side-navigation-list>
                        <vl-side-navigation-item href="https://json-ld.org/playground/" text="JSON-LD Playground"
                                                 target="_blank"/>
                        <vl-side-navigation-item href="https://data.vlaanderen.be/shacl-validator/"
                                                 text="OSLO Validator"/>
                        <vl-side-navigation-item href="https://data.vlaanderen.be" text="URI Validator"/>
                    </vl-side-navigation-list>
                </vl-side-navigation>
            </vl-column>
        </vl-grid>

    </vl-layout>
</template>

<script>
    export default {
        name: "IntroductionComponent"
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-introduction/src/scss/introduction";
    @import "~@govflanders/vl-ui-side-navigation/src/scss/side-navigation";

</style>
