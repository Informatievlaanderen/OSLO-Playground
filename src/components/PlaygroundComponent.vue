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
                <vl-button @click="parse = false" :class="!parse ? 'vl-button--secondary' : ''">Shacl Validation
                </vl-button>
            </vl-column>
        </vl-grid>

        <vl-grid v-if="parse === true">
            <vl-column width="11">
                <vl-textarea v-model="input" rows="16"></vl-textarea>
            </vl-column>
            <vl-column>
                <vl-button @click="sendDataToParse">Parse</vl-button>
            </vl-column>
        </vl-grid>

        <vl-grid v-if="parse === false">
            <vl-column width="7">
                <vl-textarea v-model="input" rows="16"></vl-textarea>
            </vl-column>
            <vl-column width="5">
                <vl-tabs>
                    <vl-tab label="OSLO Applicatieprofiel">
                        <p>Selecteer hieronder het OSLO applicatie profiel waartegen u uw data wil valideren.</p>
                        <vl-select v-model="applicationProfile">
                            <option v-for="ap in applicationProfiles" v-bind:key="ap" :value="ap">{{ ap }}</option>
                        </vl-select>
                    </vl-tab>
                    <vl-tab label="Eigen SHACL-bestand">
                        <vl-upload
                                id="shapeFile"
                                name="shapeFile"
                                url="https://httpbin.org/post"
                                upload-drag-text="Sleep het SHACL-bestand naar hier om het toe te voegen."
                                upload-label="SHACL-bestand toevoegen"
                                max-files="1"
                                max-files-msg="Je mag maar 1 bestand tegelijk uploaden"
                                max-filesize="20000000"
                                max-filesize-msg="Het bestand mag max 20000000 zijn."
                                allowed-file-types="application/pdf"/>
                    </vl-tab>
                </vl-tabs>

                <vl-region>
                    <vl-column>
                        <vl-button>Valideer</vl-button>
                    </vl-column>
                </vl-region>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    import fetch from 'node-fetch';
    import jsonld from 'jsonld';
    import rdfParser from "rdf-parse";
    import EventBus from '../eventBus'


    export default {
        name: "PlaygroundComponent",
        data() {
            return {
                parse: true,
                applicationProfiles: [
                    "Adresregister", "Besluit Publicatie", "Dienstencataloog", "Generiek-basis",
                    "Generiek terugmeldfaciliteit", "Notificatie-basis", "Organisatie-basis",
                    "Persoon-basis", "Subsidieregister", "Contactvoorkeuren",
                    "Dienst transactiemodel", "Vlaamse codex"
                ],
                applicationProfile: null,
                input: null,
                showResult: false


            }
        },
        methods: {
            /* eslint-disable no-console */
            loadExample(event) {
                fetch('http://localhost:8080/examples/' + event + '.jsonld').then(resp => resp.json()).then(data => {
                    this.input = JSON.stringify(data, null, 4);
                })
            },
            sendDataToParse() {
                EventBus.$emit('parse:data', this.input);
            }
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
