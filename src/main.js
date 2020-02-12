// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './assets/element-variables.scss'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/* eslint-disable */
router.beforeEach((to, from, next) => {
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function () {
      //每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();   //判断有没有 baidu_tj  元素，有就删除
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?3986531838ddc60c0db72379e5439096";
      hm.id = "baidu_tj"
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
  next();
})
