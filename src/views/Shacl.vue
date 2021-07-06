<template>
  <div>
    <vl-grid>
      <vl-column width="7">
        <vl-textarea
          id="inputArea"
          v-model="input"
          rows="16"
          @keydown.tab.prevent="tab($event)"
          @keyup="format($event)"
        />
      </vl-column>
      <vl-column width="4">
        <vl-grid mod-stacked>
          <vl-column>
            <p>Selecteer een OSLO applicatieprofiel waartegen je je data wil valideren</p>
            <vl-select
              v-model="apChoice"
              placeholder-text="Selecteer een applicatieprofiel"
            >
              <option
                v-for="ap in applicationProfiles"
                :key="ap"
                :value="ap.toLowerCase().replace(' ', '_')"
              >
                {{ ap }}
              </option>
            </vl-select>
          </vl-column>
          <vl-column>
            <p>Selecteer het gewenste output-formaat</p>
            <vl-select
              v-model="formatChoice"
              placeholder-text="Selecteer een formaat"
            >
              <option
                v-for="output in formats"
                :key="output"
                :value="output"
              >
                {{ output }}
              </option>
            </vl-select>
          </vl-column>
          <vl-column>
            <vl-button @click="validate">
              Valideer
            </vl-button>
          </vl-column>
        </vl-grid>
      </vl-column>
    </vl-grid>

    <vl-region>
      <vl-grid v-if="optionError && (formatChoice === '' || apChoice === null)">
        <vl-column width="11">
          <vl-alert
            icon=""
            mod-error
            :title="'Gelieve een applicatieprofiel en/of outputformaat te kiezen.'"
          />
        </vl-column>
      </vl-grid>
      <vl-grid v-if="fetchError">
        <vl-column width="11">
          <vl-alert
            icon=""
            mod-error
            :title="'Error - ' + fetchErrorMessage"
          />
        </vl-column>
      </vl-grid>
      <ShaclResultComponent :result="result" />
    </vl-region>
  </div>
</template>

<script>
    import store from "../store/store";
    import ShaclResultComponent from "./ShaclResult";
    const fetch = require('node-fetch');

    const config = require('../../config');
    const Base64 = require('js-base64').Base64;

    export default {
        name: "ShaclComponent",
        components: {ShaclResultComponent},
        props: {
            documentData: {
              type: Object,
              default: null
            }
        },
        data() {
            return {
                input: '',
                applicationProfiles: [],
                formats: [
                    "text/turtle", "application/ld+json", "application/n-triples", "application/rdf+xml"
                ],
                apChoice: null,
                formatChoice: "text/turtle",
                result: null,
                optionError: false,
                fetchError: false,
                fetchErrorMessage: ""
            }
        },
        watch: {
            documentData: function (value) {
                if (value != null) {
                    this.input = JSON.stringify(value, null, 4);
                }
            }
        },
        mounted() {
            this.input = store.state.data;
        },
        beforeCreate() {
            // Read config of the backend to get all application profiles
            fetch(config.VALIDATOR_BACKEND_CONFIG)
                .then(res => res.text())
                .then(data => {
                    const result = data.match(/validator.typeLabel.[a-zA-Z0-9 =_]*/g);
                    let names = [];
                    for(let ap of result){
                        names.push(ap.replace(/validator.typeLabel.[a-zA-Z_]*( )?=( )?/, ""));
                    }
                    store.commit('setApplicationProfiles', names);
                    this.applicationProfiles = store.getters.ApplicationProfiles;
                })
        },
        beforeUnmount() {
            if (this.input !== store.state.data) {
                store.commit('updateData', this.input);
            }
        },
        methods: {
            validate() {
                if(this.input === ''){
                    return;
                }

                // Update store with latest version of the input (in case it has changed)
                if (this.input !== store.state.data) {
                    store.commit('updateData', this.input);
                }

                if (this.apChoice && this.formatChoice) {
                    this.optionError = false;

                    const body = JSON.stringify({
                        contentToValidate: Base64.encode(this.input),
                        embeddingMethod: "BASE64",
                        contentSyntax: 'application/ld+json',
                        validationType: this.apChoice,
                        reportSyntax: this.formatChoice
                    });

                    fetch(config.SHACL_VALIDATION, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: body
                    }).then(res => {
                        this.fetchError = false;
                        this.fetchErrorMessage = '';

                        this.result = res;
                    }).catch((reason) => {
                        this.fetchError = true;
                        this.fetchErrorMessage = reason;
                    });
                } else {
                    // Show message that an AP and format must be chosen
                    this.optionError = true;
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
                if (event.keyCode === 51) {
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
        }
    }
</script>

<style lang="scss">
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-select/src/scss/select";
    @import "~@govflanders/vl-ui-button/src/scss/button";
</style>
