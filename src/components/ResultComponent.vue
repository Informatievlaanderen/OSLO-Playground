<template>
    <vl-layout>
        <vl-grid v-if="parseResult">
            <vl-column width="11">
                <vl-alert v-if="!error"
                          icon="calendar_check"
                          title="Correcte JSON-LD"
                          mod-success
                />
                <vl-alert v-if="error"
                          icon="cross"
                          title="Er zijn één of meer fouten gevonden in de data"
                          mod-error
                />
            </vl-column>
        </vl-grid>
        <vl-grid v-if="validationResult && validationError">
            <vl-column width="11">
                <vl-alert icon="warning"
                          title="Er ging iets mis bij het valideren van de data"
                          mod-error
                />
            </vl-column>
        </vl-grid>
        <vl-grid v-if="showResult">
            <vl-column>
                <vl-title id="result_title" tag-name="h3">Resultaat</vl-title>
            </vl-column>
            <vl-column width="11" v-if="parseResult">
                <vl-tabs>
                    <vl-tab label="N-Quads">
                        <vl-textarea v-model="nQuadsData" rows="16" mod-disabled></vl-textarea>
                    </vl-tab>
                    <vl-tab label="Tabel" class="vl-u-table-overflow">
                        <vl-data-table>
                            <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Predicate</th>
                                <th>Object</th>
                                <th>DataType</th>
                                <th>Language</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="quad in tableData">
                                <td>{{ quad.subject.value }}</td>
                                <td>{{ quad.predicate.value }}</td>
                                <td>{{ quad.object.value }}</td>
                                <td v-if="quad.object.datatype">{{ quad.object.datatype.value }}</td>
                                <td v-else></td>
                                <td v-if="quad.object.language">{{ quad.object.language}}</td>
                                <td v-else></td>
                            </tr>
                            </tbody>
                        </vl-data-table>
                    </vl-tab>
                </vl-tabs>
            </vl-column>
            <vl-column width="11" v-if="validationResult">
                <pre>
                    {{validationData}}
                </pre>
            </vl-column>
        </vl-grid>
    </vl-layout>

</template>

<script>
    /* eslint-disable no-console */
    import EventBus from '../eventBus';
    import jsonld from 'jsonld';
    import rdfParser from "rdf-parse";

    const config = require('../../config.js');
    const shacl = require('shacl-js');


    export default {
        name: "ResultComponent",
        data() {
            return {
                showResult: false,
                nQuadsData: null,
                tableData: null,
                error: null,
                parseResult: false,
                validationResult: false,
                validationData: null,
                validationError: false
            }
        },
        methods: {
            parseData(data) {
                this.parseResult = true;
                this.validationResult = false;
                try {
                    if (data) {
                        // TODO: this should be achieved by only using one method
                        // Both methods give other subjects (e.g. _:b0 vs b4)

                        // N-Quads
                        // TODO: create RDFObject
                        jsonld.toRDF(JSON.parse(data), {format: 'application/n-quads'}, (err, quads) => {
                            if (err) {
                                this.showResult = false;
                                this.error = true;
                            } else {
                                this.nQuadsData = quads;
                                this.showResult = true;
                                this.error = false;
                            }
                        });


                        // Table
                        const dataStream = require('streamify-string')(data);
                        let quads = [];
                        rdfParser.parse(dataStream, {contentType: 'application/ld+json', baseIRI: 'http://example.org'})
                            .on('data', (quad) => {
                                quads.push(quad);
                            })
                            .on('error', (error) => {
                                this.showResult = false;
                                this.error = true;
                            })
                            .on('end', () => {
                                this.tableData = quads;
                                this.showResult = true;
                                this.error = false;
                            });
                    }
                } catch (e) {
                    this.error = true;
                    this.showResult = false;
                }


            },
            processValidationResult(result) {
                this.validationResult = true;
                this.validationError = false;
                this.parseResult = false;
                this.showResult = true;

                const decoder = new TextDecoder('utf-8');
                const reader = result.body.getReader();
                reader.read().then(({value, done}) => {
                    this.validationData = decoder.decode(value);
                });
            },
            showValidationError(error){
                this.validationError = true;
            }
        },
        mounted() {
            EventBus.$on('parse:data', data => this.parseData(data));
            EventBus.$on('validationResult', result => this.processValidationResult(result));
            EventBus.$on('validationError', err => this.showValidationError(err));
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-textarea/src/scss/textarea";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-tabs/src/scss/tabs";
    @import "~@govflanders/vl-ui-data-table/src/scss/data-table";
    @import "~@govflanders/vl-ui-alert/src/scss/alert";

</style>
