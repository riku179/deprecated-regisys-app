import Vue from "vue"
import Components from "vue-class-component"
import {router} from "./router";
import NavbarApp from "./components/Navbar.vue"

Vue.component("app-navbar", NavbarApp)
// TODO コンポーネントがvueにまとまっているのは辛いのでディレクトリで分ける
const app = new Vue({
    router,
}).$mount("#app")
