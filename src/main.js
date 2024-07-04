import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import mitt from 'mitt'
import PDFObjectPlugin from 'pdfobject-vue';

const app = createApp(App)

export const bus = mitt()

app.config.globalProperties.$bus = bus
app.config.globalProperties.$cookies = VueCookies


app.use(router)
app.use(store)
app.use(mavonEditor)

app.use(PDFObjectPlugin);

app.mount('#app')
