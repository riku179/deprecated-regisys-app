import Vue from "vue"
import VueRouter from "vue-router"
import LoginApp from "./Login.vue"
import DashboardApp from "./Dashboard.vue"
import * as auth from "./lib/auth"
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: "/", redirect: "/login" },
        { path: "/login", component: LoginApp },
        { path: "/dashboard", component: DashboardApp },
    ]
})

// 各ルートへの遷移前にフック
router.beforeEach((to, from, next) => {
    let jwt = auth.GetToken()
    // 何もなければ未認証
    if (to.path === "/login" && jwt == null) {
        next()
    } else if (jwt === null) {
        next("/login")
    } else {
        // `/login`へのアクセスは既に認証していれば`/dashboard`へリダイレクト
        if (to.path === "/login") {
            if (jwt.isValid()) {
                next("/dashboard")
            }
            // その他のページはトークンが失効していれば削除して`/login`へリダイレクト
        } else if (!jwt.isValid()) {
            auth.RemoveToken()
            next("/login")
        }
        next()
    }
})

const app = new Vue({
    router
}).$mount("#app")
