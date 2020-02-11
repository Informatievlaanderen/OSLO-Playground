import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

// Webcomponents
import {
  VlCore,
  VlUtil,
  VlRegion,
  VlLayout,
  VlGrid,
  VlColumn,
  VlButton,
  VlIntroduction,
  VlSideNavigation,
  VlSideNavigationList,
  VlSideNavigationItem,
  VlTextarea,
  VlTitle,
  VlSelect,
  VlTabs,
  VlTab,
  VlUpload,
  VlAlert,
  VlDataTable,
} from'@govflanders/vl-ui-vue-components';

Vue.component('vl-region', VlRegion);
Vue.component('vl-grid', VlGrid);
Vue.component('vl-column', VlColumn);
Vue.component('vl-layout', VlLayout);
Vue.component('vl-introduction', VlIntroduction);
Vue.component('vl-side-navigation', VlSideNavigation);
Vue.component('vl-side-navigation-list', VlSideNavigationList);
Vue.component('vl-side-navigation-item', VlSideNavigationItem);
Vue.component('vl-textarea', VlTextarea);
Vue.component('vl-title', VlTitle);
Vue.component('vl-select', VlSelect);
Vue.component('vl-tabs', VlTabs);
Vue.component('vl-tab', VlTab);
Vue.component('vl-upload', VlUpload);
Vue.component('vl-alert', VlAlert);
Vue.component('vl-data-table', VlDataTable);

Vue.component('vl-button', VlButton);

Vue.use(VlCore);
Vue.use(VlUtil);


new Vue({
  render: h => h(App),
}).$mount('#app')
