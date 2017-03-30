import Vue from "vue"
import Components from "vue-class-component"
import {router} from "./router";
import NavbarApp from "./components/Navbar.vue"
import Modal from "./components/Modal.vue"

Vue.component("app-navbar", NavbarApp)
Vue.component("modal", Modal)

const app = new Vue({
    router,
}).$mount("#app")
