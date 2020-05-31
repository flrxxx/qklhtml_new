// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {get, post, shuxin} from './lib'
// 引用中英文切换
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$shuxin = shuxin
// Vue.prototype.bu = 'http://'
Vue.use(ElementUI)
Vue.use(VueI18n)

Vue.config.productionTip = false

const i18n = new VueI18n({
  // locale: LangStorage.getLang('zh'),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
  locale: 'en', // 语言标识
  messages: {
    locale: Cookies.set('PLAY_LANG', Cookies.get('PLAY_LANG')),
    'zh': require('./common/lang/zh'),
    'en': require('./common/lang/en')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
