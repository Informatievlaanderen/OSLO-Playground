<template>
    <div>
        <vl-grid mod-stacked>
            <vl-column width="11">
                <!--<vl-textarea id="inputArea" @keydown.tab.prevent="insertTab($event)" v-model="input" rows="16"></vl-textarea>-->
                <vl-textarea id="inputArea" @keydown.tab.prevent="tab($event)" @keyup="format($event)" v-model="input"
                             rows="16"></vl-textarea>
            </vl-column>
            <vl-column>
                <vl-button id="parseButton" @click.native="parse">Parse</vl-button>
            </vl-column>
        </vl-grid>
        <vl-region>
            <vl-grid v-if="error">
                <vl-column width="11">
                    <vl-alert id="parseError" icon=""
                              mod-error
                              :title="'Error - ' + errorMessage"/>
                </vl-column>
            </vl-grid>
            <ParseResultComponent v-if="parsed && !error" v-bind:quads="quads" v-bind:quadString="quadString"/>
        </vl-region>
    </div>
</template>

<script>
    import store from "../store/store";
    import ParseResultComponent from "./ParseResult";

    export default {
        name: "ParseComponent",
        components: {ParseResultComponent},
        props: {
          documentData: Object
        },
        data() {
            return {
                input: '',
                quads: [],
                quadString: '',
                error: false,
                errorMessage: '',
                parsed: false
            }
        },
        methods: {
            async parse() {
                this.quads = [];
                this.quadString = '';

                this.parsed = true;

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
                        .on('end', () => {
                        });


                } catch (e) {
                    this.error = true;
                    this.errorMessage = e.message;
                }
            },
            tab(event) {
                const startPos = event.target.selectionStart;
                const endPos = event.target.selectionEnd;
                this.input = this.input.substring(0, startPos) + '\t' + this.input.substring(endPos);
                this.setCaretPosition(startPos + 1);
            },
            format(event) {
                const startPos = event.target.selectionStart;
                const endPos = event.target.selectionEnd;

                // '{'
                if (event.keyCode === 57) {
                    this.input = this.input.substring(0, startPos) + '}' + this.input.substring(endPos);
                    this.setCaretPosition(startPos);
                }

                // '"'
                if(event.keyCode === 51){
                    this.input = this.input.substring(0, startPos) + '"' + this.input.substring(endPos);
                    this.setCaretPosition(startPos);
                }
            },
            setCaretPosition(position) {
                const textarea = document.getElementById('inputArea');
                this.$nextTick(() => {
                    textarea.focus();
                    textarea.setSelectionRange(position, position);
                });
            }
        },
        mounted() {
            this.input = store.state.data;
        },
        beforeDestroy() {
            if (this.input !== store.state.data) {
                store.commit('updateData', this.input);
            }
        },
        watch: {
            documentData: function (value) {
                if(value != null){
                    this.input = JSON.stringify(value, null, 4);
                }
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
