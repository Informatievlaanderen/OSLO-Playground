<template>
    <vl-textarea v-model="expanded" rows="16" mod-disabled></vl-textarea>
</template>

<script>
    export default {
        name: "ExpandedComponent",
        props: {
            expanded: String
        }
    }
</script>

<style lang="scss">

</style>
