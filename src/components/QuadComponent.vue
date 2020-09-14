<template>
    <div>
        <vl-textarea v-model="quadString" rows="16" mod-disabled></vl-textarea>
    </div>
</template>

<script>
    export default {
        name: "QuadComponent",
        props: {
            quadString: String
        }
    }
</script>

<style lang="scss">
</style>
