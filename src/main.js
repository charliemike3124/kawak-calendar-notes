import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import AOS from "./plugins/AOS";
import CommonHelpers from "./resources/utils/commonHelpers";
import GeneralConstants from "./resources/constants/generalConstants";

import "./styles/global/baseStyles.less";
import "./styles/global/globalVuetify.less";
import "aos/dist/aos.css";

Vue.config.productionTip = false;

Vue.prototype.helpers = { ...CommonHelpers };
Vue.prototype.constants = { ...GeneralConstants };

new Vue({
  router,
  store,
  vuetify,
  AOS,
  render: (h) => h(App),
}).$mount("#app");
