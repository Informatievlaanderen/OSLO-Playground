<template>
    <vl-layout>
        <vl-grid>
            <vl-column width="7">
                <vl-title tag-name="h4">Voorbeelden:</vl-title>
                <vl-select
                        @input="loadExample($event)"
                        name="example_selector" id="example_selector">
                    <option value="adres">
                        Adres
                    </option>
                    <option
                            value="persoon">
                        Persoon
                    </option>
                    <option
                            value="organisatie"
                            disabled>
                        Organisatie
                    </option>
                </vl-select>
            </vl-column>
            <vl-column width="5">
                <vl-button @click="parse = true" style="margin-right: 7px;"
                           :class="parse ? 'vl-button--secondary' : ''">JSON-LD Parsing
                </vl-button>
                <vl-button id="shacl_button" @click="parse = false" :class="!parse ? 'vl-button--secondary' : ''">Shacl Validation
                </vl-button>
            </vl-column>
        </vl-grid>

        <vl-grid v-if="parse === true">
            <vl-column width="11">
                <vl-textarea id="textarea1" v-model="input" rows="16"></vl-textarea>
            </vl-column>
            <vl-column>
                <vl-button @click="sendDataToParse">Parse</vl-button>
            </vl-column>
        </vl-grid>

        <vl-grid v-if="parse === false">
            <vl-column width="7">
                <vl-textarea id="textarea2" v-model="input" rows="16"></vl-textarea>
            </vl-column>
            <vl-column width="5">
                <vl-tabs ref="tabs">
                    <vl-tab label="OSLO Applicatieprofiel">
                        <p>Selecteer hieronder het OSLO applicatie profiel waartegen u uw data wil valideren.</p>
                        <vl-select v-model="applicationProfile">
                            <option v-for="ap in applicationProfiles" v-bind:key="ap" :value="ap.toLowerCase()">{{ ap.replace('_', ' ') }}</option>
                        </vl-select>
                    </vl-tab>
                </vl-tabs>

                <br>
                <vl-column>
                    <vl-button @click="sendDataToValidate">Valideer</vl-button>
                </vl-column>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    import fetch from 'node-fetch';
    import EventBus from '../eventBus';

    const config = require('../../config.js');


    export default {
        name: "PlaygroundComponent",
        data() {
            return {
                parse: true,
                applicationProfiles: [
                    "Adresregister", "Besluit_publicatie", "Dienstencataloog", "Generiek_basis",
                    "Generieke_terugmeldfaciliteit", "Notificatie_basis", "Organisatie_basis", "Persoon_basis", "Subsidieregister",
                    "Contactvoorkeuren", "Dienst_transactiemodel", "Vlaamse_codex"
                ],
                applicationProfile: null,
                input: null,
                showResult: false,
                shaclFile: null


            }
        },
        methods: {
            /* eslint-disable no-console */
            enableTab(id) {
                let el = document.getElementById(id);
                el.onkeydown = function (e) {
                    if (e.code == "Tab") { // tab was pressed

                        // get caret position/selection
                        var val = this.value,
                            start = this.selectionStart,
                            end = this.selectionEnd;

                        // set textarea value to: text before caret + tab + text after caret
                        this.value = val.substring(0, start) + '\t' + val.substring(end);

                        // put caret at right position again
                        this.selectionStart = this.selectionEnd = start + 1;

                        // prevent the focus lose
                        return false;

                    }
                };
            },
            loadExample(event) {
                fetch(config.EXAMPLE_URL + event + '.jsonld').then(resp => resp.json()).then(data => {
                    this.input = JSON.stringify(data, null, 4);
                })
            },
            sendDataToParse() {
                EventBus.$emit('parse:data', this.input);
            },
            async sendDataToValidate() {
                if(this.input && this.applicationProfile){
                    const base64 = btoa(this.input);
                    const body = JSON.stringify({
                        contentToValidate: base64,
                        embeddingMethod: 'BASE64',
                        contentSyntax: 'application/ld+json',
                        validationType: this.applicationProfile,
                        reportSyntax: 'text/turtle'
                    });

                    // Send content to validator
                    fetch(config.SHACL_VALIDATION_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: body
                    }).then(res => {
                        EventBus.$emit('validationResult', res);
                    })
                }
            },
            fileAdded(file) {
                this.shaclFile = file;
            }

        },
        mounted() {
            //this.enableTab('textarea1');
            //this.enableTab('textarea2');
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-textarea/src/scss/textarea";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-select/src/scss/select";
    @import "~@govflanders/vl-ui-button/src/scss/button";
    @import "~@govflanders/vl-ui-tabs/src/scss/tabs";
    @import "~@govflanders/vl-ui-upload/src/scss/upload";
    @import "~@govflanders/vl-ui-alert/src/scss/alert";
    @import "~@govflanders/vl-ui-data-table/src/scss/data-table";

    .vl-textarea {
        margin-top: 2%;
        width: 100%;
        resize: none;
    }

    .vl-select {
        width: 50%;
    }

</style>
