import Vue from 'vue';
import App from './App.vue';
import store from "./store/store";

Vue.config.productionTip = false

// Webcomponents
import VlUiVueComponents from'@govflanders/vl-ui-vue-components';

const validatorConfig = {
  inject: true,
  locale: 'nl',
};

// install the component library with config
Vue.use(VlUiVueComponents, {
  validation: validatorConfig,
});


//Vue.use(VlCore);
//Vue.use(VlUtil);


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
