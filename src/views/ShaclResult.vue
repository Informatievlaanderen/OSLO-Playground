<template>
  <div>
    <vl-grid>
      <vl-column width="11">
        <vl-textarea
          v-model="output"
          rows="16"
          mod-disabled
        />
      </vl-column>
    </vl-grid>
  </div>
</template>

<script>

    import { Response } from 'node-fetch';

    export default {
        name: "ShaclResultComponent",
        props: {
            result: Response
        },
        data() {
            return {
                output: ''
            }
        },
        watch: {
            'result': function (update) {
                if(update !== null){
                    const decoder = new TextDecoder('utf-8');
                    const reader = update.body.getReader();
                    reader.read().then(({value, done}) => {
                        this.output = decoder.decode(value);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
