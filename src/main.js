import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import ExTableColumn from 'ex-table-column';

import formCreate from '@form-create/element-ui'
import '@/icons' // icon

import '../mock' // simulation data

Vue.use(ElementUI, { locale })
Vue.component(ExTableColumn.name, ExTableColumn);
Vue.use(formCreate)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
