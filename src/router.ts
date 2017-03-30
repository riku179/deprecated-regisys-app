import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
import * as auth from "./lib/auth"
import LoginApp from "./Login.vue"
import DashboardApp from "./Dashboard.vue"
import ItemsApp from "./ItemsApp.vue"
import OrdersApp from "./OrdersApp.vue"
import UsersApp from "./UsersApp.vue"
import RegisterApp from "./RegisterApp.vue"

export const router = new VueRouter({
    routes: [
        { path: "/", redirect: "/login" },
        { path: "/login", component: LoginApp },
        { path: "/dashboard", component: DashboardApp },
        { path: "/items", component: ItemsApp },
        { path: "/orders", component: OrdersApp },
        { path: "/users", component: UsersApp },
        { path: "/register", component: RegisterApp }
    ]
})

// 各ルートへの遷移前にフック
router.beforeEach((to, from, next) => {
    let jwt = auth.GetToken()
    // 何もなければ未認証
    if (to.path === "/login" && jwt === null) {
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
