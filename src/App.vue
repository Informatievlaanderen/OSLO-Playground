<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    /* eslint-disable import/prefer-default-export */
    import HomeComponent from "./views/Home";

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
