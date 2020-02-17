<template>
  <div id="app">
    <vl-region>
      <IntroductionComponent></IntroductionComponent>
    </vl-region>
    <vl-region>
      <PlaygroundComponent></PlaygroundComponent>
    </vl-region>
    <vl-region>
      <ResultComponent @add:data=""></ResultComponent>
    </vl-region>
  </div>
</template>

<script>
  /* eslint-disable import/prefer-default-export */
  import IntroductionComponent from "./components/IntroductionComponent";
  import PlaygroundComponent from "./components/PlaygroundComponent";
  import ResultComponent from "./components/ResultComponent";
  export default {
    name: 'app',
    components: {
      ResultComponent,
      PlaygroundComponent,
      IntroductionComponent
    }
  }
</script>

<style lang="scss">
  $vl-icon-font-location: "assets/";
  @import "~@govflanders/vl-ui-core/src/scss/core";
  @import "~@govflanders/vl-ui-content-header/src/scss/content-header";
</style>
