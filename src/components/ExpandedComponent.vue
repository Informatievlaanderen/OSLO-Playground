<template>
  <vl-textarea
    v-model="expandedFormat"
    rows="16"
    mod-disabled
  />
</template>

<script>
export default {
    name: "ExpandedComponent",
    props: {
        expanded: {
          type: String,
          default: ""
        }
    },
    data(){
      expandedFormat: expanded
    }
}
</script>

<style lang="scss">

</style>
