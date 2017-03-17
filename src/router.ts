import Vue from "vue"
import VueRouter from "vue-router"
import * as auth from "./lib/auth"
Vue.use(VueRouter)
import LoginApp from "./Login.vue"
import DashboardApp from "./Dashboard.vue"

export const router = new VueRouter({
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
    if (to.path === "/login" && jwt === null) {
        console.log("login plz!")
        next()
    } else if (jwt === null) {
        console.log("missing token on Storage. login plz!")
        next("/login")
    } else {
        // `/login`へのアクセスは既に認証していれば`/dashboard`へリダイレクト
        if (to.path === "/login") {
            if (jwt.isValid()) {
                console.log("You are already logging in!")
                next("/dashboard")
            }
            // その他のページはトークンが失効していれば削除して`/login`へリダイレクト
        } else if (!jwt.isValid()) {
            console.log("token is invalid! login plz!")
            auth.RemoveToken()
            next("/login")
        }
        console.log("You are OK!")
        next()
    }
})
