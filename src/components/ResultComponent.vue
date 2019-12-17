<template>
    <vl-layout>
        <vl-grid v-if="showResult">
            <vl-column>
                <vl-title id="result_title" tag-name="h3">Resultaat</vl-title>
            </vl-column>
            <vl-column width="11">
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
                            <tr v-for="quad in tableData" v-bind:key="quad">
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
                tableData: null
            }
        },
        methods: {
            parseData(data) {
                if (data) {
                    // TODO: this should be achieved by only using one method
                    // Both methods give other subjects (e.g. _:b0 vs b4)

                    // N-Quads
                    // TODO: create RDFObject
                    jsonld.toRDF(JSON.parse(data), {format: 'application/n-quads'}, (err, quads) => {
                        if (err) {
                            console.log(err);
                            this.showResult = false;
                        } else {
                            this.nQuadsData = quads;
                            this.showResult = true;
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
                            console.error(error);
                            this.showResult = false;
                        })
                        .on('end', () => {
                            this.tableData = quads;
                            this.showResult = true;
                        });
                }
            },
            validateData([data, shacl, isApplicationProfile]){
                // TODO
                console.log(data);
            }
        },
        mounted() {
            EventBus.$on('parse:data', data => this.parseData(data));
            //EventBus.$on('validate:data', input => this.validateData(input));
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-textarea/src/scss/textarea";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-tabs/src/scss/tabs";
    @import "~@govflanders/vl-ui-data-table/src/scss/data-table";

</style>
