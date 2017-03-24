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
        showModal = false // test
        userItems: Array<Item> = []
        allItems: Array<Item> = []
        jwt = auth.GetToken() as auth.JWT
        menu: Menu = "user"

        // lifecycle method
        created() {
            fetch("/api/item?user=" + this.jwt.sub, {
                method: "GET",
                headers: GenJWTHeader()
            }).then(r => {
                r.json().then(data => {
                    this.userItems = data as Array<Item>
                })
            }, err => {
                console.log(err)
            })
        }

        fetchDone = false
        switchList() {
            if (this.fetchDone) {
                this.menu = "all"
            } else {
                this.fetchDone = true
                fetch("/api/item", {
                    method: "GET",
                    headers: GenJWTHeader()
                }).then(r => {
                    r.json().then(data => {
                        this.allItems = data as Array<Item>
                    })
                    this.menu = "all"
                }, err => {
                    console.log(err)
                })
            }
        }

    }

    type Menu = "user" | "all"
</script>
