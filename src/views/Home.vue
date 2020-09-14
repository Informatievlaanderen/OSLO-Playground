<template>
    <div>
        <vl-region>
            <vl-layout>
                <vl-grid>
                    <vl-column width="8">
                        <vl-introduction>
                            De playground van Informatie Vlaanderen is gebaseerd op de reeds bestaande
                            <a href="https://json-ld.org/playground/">JSON-LD playground</a>. Deze OSLO playground maakt het mogelijk
                            voor developers om op een snelle manier JSON-LD data op te stellen en te parsen. Bijkomend kan deze data
                            gevalideerd worden tegen één van de vele OSLO applicatieprofielen via de Shacl Validator.
                        </vl-introduction>
                    </vl-column>
                    <vl-column width="3">
                        <vl-side-navigation class="example-sticky" title="Zie ook">
                            <vl-side-navigation-list>
                                <vl-side-navigation-item href="https://test.data.vlaanderen.be/shacl-validator/"
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
                    <vl-column width="6">
                        <vl-action-group>
                            <vl-button id="parseButtonActive" v-if="action === 'parsing'" mod-tertiary>JSON-LD parsing</vl-button>
                            <vl-button id="parseButtonInactive" @click.native="setAction('parsing')" v-else>JSON-LD Parsing</vl-button>
                            <vl-button id="shaclButtonActive" v-if="action === 'shacl'" mod-tertiary>SHACL validatie</vl-button>
                            <vl-button id="shaclButtonInactive" @click.native="setAction('shacl')" v-else>SHACL validatie</vl-button>
                        </vl-action-group>
                    </vl-column>
                    <vl-column width="5">
                        <vl-action-group>
                            <vl-button id="fetchButton" mod-narrow @click.native="fetchDocument">
                                <vl-icon icon="cloud-download"/>
                            </vl-button>
                            <vl-input-field v-if="!fetchError" class="urlInput" v-model="documentURL"
                                            placeholder="JSON-LD document URL"/>
                            <vl-input-field v-else  class="urlInput" v-model="documentURL"
                                             placeholder="JSON-LD document URL" mod-error/>
                            <p v-if="fetchError" style="color: red;">Fout bij het ophalen van de URL</p>
                        </vl-action-group>
                    </vl-column>
                    <vl-column v-if="action === 'parsing'">
                        <ParseComponent v-bind:documentData="documentData"/>
                    </vl-column>
                    <vl-column v-if="action === 'shacl'">
                        <ShaclComponent v-bind:documentData="documentData"/>
                    </vl-column>
                </vl-grid>
            </vl-layout>
        </vl-region>
    </div>
</template>

<script>
    import ParseComponent from "./Parse";
    import ShaclComponent from "./Shacl";
    export default {
        name: "HomeComponent",
        components: {ShaclComponent, ParseComponent},
        data() {
            return {
                action: 'parsing',
                documentURL: '',
                documentData: null,
                fetchError: false
            }
        },
        methods: {
            setAction(value) {
                this.action = value;
            },
            async fetchDocument() {
                const fetch = require('node-fetch');
                if (this.documentURL != '') {
                    this.documentData = await new Promise(resolve => {
                        fetch(this.documentURL).then(result => {this.fetchError = false; resolve(result.json())}).catch(() => this.fetchError = true)
                    });
                }
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
    @import "~@govflanders/vl-ui-input-field/src/scss/input-field";
    @import "~@govflanders/vl-ui-icon/src/scss/icon";

    .urlInput {
        width: 80%;
    }
</style>
