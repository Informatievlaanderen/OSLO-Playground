<template>
    <div id="app">
        <HomeComponent/>
    </div>
</template>

<script>
    /* eslint-disable import/prefer-default-export */
    import HomeComponent from "./components/HomeComponent";

    export default {
        name: 'app',
        components: {
            HomeComponent
        }
    }
</script>

<style lang="scss">
    $vl-icon-font-location: "assets/";
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-content-header/src/scss/content-header";
</style>
