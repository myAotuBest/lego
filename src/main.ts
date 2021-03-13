import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "ant-design-vue/lib/date-picker/style/css";

createApp(App).use(store).use(Antd).use(router).mount('#app')
