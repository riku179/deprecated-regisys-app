<template lang="pug" src="./template/ItemsApp.pug"></template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Item} from "./types"
    import {GenJWTHeader} from "./lib/auth"
    import * as auth from "./lib/auth"
    import "whatwg-fetch"

    @Component
    export default class ItemsApp extends Vue {
        showModal = false
        userItems: Array<Item> = []
        allItems: Array<Item> = []
        jwt = auth.GetToken() as auth.JWT
        menu: Menu = "user"
        newItemName = ""
        newItemPrice = ""
        newItemMemPrice = ""
        newItemQuantity = ""

        // lifecycle method
        created() {
            this.switchUserList()
        }

        switchUserList() {
            this.menu = "user"
            fetch("/api/item?user=" + this.jwt.sub, {
                method: "GET",
                headers: {
                    "Authorization": GenJWTHeader()
                }
            }).then(r => {
                r.json().then(data => {
                    this.userItems = data as Array<Item>
                })
            }, err => {
                console.log(err)
            })
        }

        switchAllList() {
            this.menu = "all"
            fetch("/api/item", {
                method: "GET",
                headers: {
                    "Authorization": GenJWTHeader()
                }
            }).then(r => {
                r.json().then(data => {
                    this.allItems = data as Array<Item>
                })
                this.menu = "all"
            }, err => {
                console.log(err)
            })
        }

        addItem() {
            fetch("/api/item", {
                method: "POST",
                headers: {
                    "Authorization": GenJWTHeader(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_name: this.newItemName,
                    price: this.newItemMemPrice,
                    member_price: this.newItemMemPrice,
                    quantity: this.newItemQuantity,
                })
            }).then(r => {
                this.showModal = false
                this.switchUserList()
                },
                err => {
                console.log(err)
            })
        }
    }

    type Menu = "user" | "all"
</script>
