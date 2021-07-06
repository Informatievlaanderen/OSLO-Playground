<template>
  <div>
    <vl-textarea
      v-model="mutableQuadString"
      rows="16"
      mod-disabled
    />
  </div>
</template>

<script>
export default {
    name: "QuadComponent",
    props: {
        quadString: {
          type: String,
           default: ""
        }
    },
    data(){
      mutableQuadString: quadString
    }
}
</script>

<style lang="scss">
</style>
