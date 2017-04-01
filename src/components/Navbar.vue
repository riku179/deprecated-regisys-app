<template lang="pug" src="./template/Navbar.pug"></template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import MenuItem from "./MenuItem.vue"
    import {router} from '../router'
    import * as auth from '../lib/auth'
    import {Prop} from "vue-property-decorator"
    import {NavMenu} from "../types"

    @Component({
        components: {
            "menu-item": MenuItem
        }
    })
    export default class NavbarApp extends Vue {
        name = "app-navbar"

        @Prop
        loginInit: boolean

        login = typeof this.loginInit === "undefined" // default true

        jwt = auth.GetToken()

        menus: Array<NavMenu> = [
            { val: "商品", path: "/items", adminOnly: false},
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
