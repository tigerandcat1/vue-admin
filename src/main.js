import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router/index.js";
import store from "./store/index.js";


// 自定义全局组件
// import "./assets";
// 全局方法引入按钮权限
// import { buttonPermission } from "./utils/buttonPermission";
// 自定义指令按钮权限
;
Vue.use(ElementUI);


Vue.config.productionTip = false;

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");