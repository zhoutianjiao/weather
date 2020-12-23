import Vue from 'vue'
import App from './App'

// axios请求
import $http from '@/components/zhouWei-request/requestConfig';
Vue.prototype.$http = $http;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
