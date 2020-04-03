<template>
    <div>
        <vl-grid>
            <vl-column width="11">
                <vl-textarea v-model="input" rows="16"></vl-textarea>
            </vl-column>
            <vl-column>
                <vl-button @click="parse">Parse</vl-button>
            </vl-column>
        </vl-grid>
        <vl-region>
            <vl-grid v-if="error">
                <vl-column width="11">
                    <vl-alert icon=""
                              mod-error
                              :title="'Error - ' + errorMessage"/>
                </vl-column>
            </vl-grid>
            <ParseResultComponent v-bind:quads="quads" v-bind:quadString="quadString"/>
        </vl-region>
    </div>
</template>

<script>
    import store from "../store/store";
    import ParseResultComponent from "./ParseResultComponent";

    export default {
        name: "ParseComponent",
        components: {ParseResultComponent},
        data() {
            return {
                input: '',
                quads: [],
                quadString: '',
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            async parse() {
                this.quads = [];
                this.quadString = '';

                // Update store with latest version of the input
                if (this.input !== store.state.data) {
                    store.commit('updateData', this.input);
                }

                // Try to parse the provided input
                try {
                    this.error = false;
                    this.errorMessage = '';

                    // String of n-quads
                    const jsonld = require('jsonld');
                    this.quadString = await jsonld.toRDF(JSON.parse(this.input), {format: 'application/n-quads'});

                    // Quad objects (to create table)
                    const dataStream = require('streamify-string')(this.input);
                    const JsonLdParser = require("jsonld-streaming-parser").JsonLdParser;
                    const parser = new JsonLdParser();

                    parser.import(dataStream)
                        .on('data', quad => {
                            this.quads.push(quad);
                        })
                        .on('error', console.error)
                        .on('end', () => {});


                } catch (e) {
                    this.error = true;
                    this.errorMessage = e.message;
                }
            }
        },
        mounted() {
            this.input = store.state.data;
        },
        beforeDestroy() {
            if (this.input !== store.state.data) {
                store.commit('updateData', this.input);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-textarea/src/scss/textarea";
    @import "~@govflanders/vl-ui-button/src/scss/button";
    @import "~@govflanders/vl-ui-alert/src/scss/alert";

    .vl-textarea {
        margin-top: 2%;
        width: 100%;
        resize: none;
    }

    .vl-alert {
        color: darkred;
    }

</style>
