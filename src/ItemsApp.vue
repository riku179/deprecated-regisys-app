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
        // タブメニュー
        menu: Menu = "user"
        // Modal
        showModal = false
        // List
        userItems: Array<Item> = []
        allItems: Array<Item> = []

        jwt = auth.GetToken() as auth.JWT
        // Form
        newItemName = ""
        newItemPrice = ""
        memberDiscount = "0"
        newItemQuantity = ""
        // Validation
        itemNameIsValid = true
        itemPriceIsValid = true
        memDiscountIsValid = true
        itemQuantityIsValid = true

        // Error message
        fetchError = ""

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
            // TODO コンポーネント化
            if( this.newItemName.length === 0 || this.newItemName.length > 20) {
                this.itemNameIsValid = false
                return
            } else {
                this.itemNameIsValid = true
            }
            if(!validNaturalNum(this.newItemPrice) && Number(this.newItemPrice) > 0) {
                this.itemPriceIsValid = false
                return
            } else {
                this.itemPriceIsValid = true
            }
            if(!validNaturalNum(this.memberDiscount)) {
                this.memDiscountIsValid = false
                return
            } else {
                this.memDiscountIsValid = true
            }
            if(!validNaturalNum(this.newItemQuantity) && Number(this.newItemQuantity) > 0) {
                console.log(this.newItemQuantity)
                this.itemQuantityIsValid = false
                return
            } else {
                this.itemQuantityIsValid = true
            }
            fetch("/api/item", {
                method: "POST",
                headers: {
                    "Authorization": GenJWTHeader(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_name: this.newItemName,
                    price: this.newItemPrice,
                    member_price: Number(this.newItemPrice) - Number(this.memberDiscount),
                    quantity: this.newItemQuantity,
                })
            }).then(r => {
                // TODO エラー時は閉じずにエラー表示
                this.showModal = false
                this.switchUserList()
                },
                err => {
                this.fetchError = err
                console.log(err)
            })
        }
    }

    function validNaturalNum(data: string): boolean {
        if(/\d.*/.test(data)) {
            return true
        } else {
            return false
        }
    }

    type Menu = "user" | "all"
</script>

<style lang="stylus">
    .add-btn
        width 100%

    input.form-control
        width 100%
</style>
