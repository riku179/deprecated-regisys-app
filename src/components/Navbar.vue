<template lang="pug">
    nav.navbar.navbar-default.navbar-static-top
        .container-fluid
            .navbar-header
                button.navbar-toggle.collapsed(
                    type="button"
                    data-toggle="collapse"
                    data-target="#menu")
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                router-link.navbar-brand(to="/dashboard") Regisys
            #menu.collapse.navbar-collapse
                ul.nav.navbar-nav(v-if="login")
                    li(is="menu-item" v-for="(menu, index) in menus",
                    :key="menu",
                    :menu="menu")
                button.btn.btn-default.navbar-btn.navbar-right(
                    type="button"
                    @click="logout"
                    ,:style='{ display: (login ? "" : "none") }') ログアウト
                p#login-user.navbar-text.navbar-right(:style='{display: jwt ? "" : "none"}') ログイン中 : #[strong {{ jwt ? jwt.username : ""}}] ({{authority}})
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import MenuItem from "./MenuItem.vue"
    import {router} from '../router'
    import * as auth from '../lib/auth'
    import {Prop} from "vue-property-decorator"
    import {IMenu} from "../types"

    @Component({
        components: {
            "menu-item": MenuItem
        }
    })
    export default class NavbarApp extends Vue {
        @Prop
        loginInit: boolean

        login = typeof this.loginInit === "undefined" // default true

        jwt = auth.GetToken()

        menus: Array<IMenu> = [
            { val: "商品", path: "/goods", adminOnly: false},
            { val: "売上", path: "/orders", adminOnly: false},
            { val: "ユーザー", path: "/users", adminOnly: false},
            { val: "会計", path: "/register", adminOnly: true},
        ]

        logout() {
            auth.RemoveToken()
            router.push("/login")
        }

        get authority() {
            if (this.jwt != null) {
                return this.jwt.isRegister ? "Register" : "Normal"
            }
        }
    }
</script>

<style>
#login-user {
    margin-right: 10px;
}
</style>
