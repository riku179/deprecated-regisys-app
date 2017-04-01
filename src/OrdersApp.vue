<template lang="pug" src="./template/OrdersApp.pug"></template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Order, TabMenu} from "./types";
    import * as auth from './lib/auth'

    @Component
    export default class OrdersApp extends Vue {
        // タブメニュー
        menu: TabMenu = "user"

        userOrders: Array<Order> = []
        allOrders: Array<Order> = []

        jwt = auth.GetToken() as auth.JWT

        created() {
            this.switchUserList()
        }

        switchUserList() {
            this.menu = "user"
            fetch("/api/orders?user=" + this.jwt.sub, {
                method: "GET",
                headers: {
                    "Authorization": auth.GetJWTHeader()
                }
            }).then(r => {
                if(r.ok) {
                    r.json().then(data => {
                        this.userItems = data as Array<Order>
                    })
                } else {
                    alert(r.statusText)
                }
            })
        }

        switchAllList() {
            this.menu = "all"
        }

        convertUnixTime(unixtime: number): string {
            return ""
        }
    }
</script>

<style lang="stylus">
    ul.nav.nav-tabs > li > a
        cursor pointer
</style>
