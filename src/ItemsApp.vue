<template lang="pug" src="./template/ItemsApp.pug"></template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Item} from "./types"
    import {GetJWTHeader} from "./lib/auth"
    import * as auth from "./lib/auth"
    import "whatwg-fetch"

    @Component
    export default class ItemsApp extends Vue {
        // タブメニュー
        menu: Menu = "user"
        // Modal
        showAddModal = false
        showEditModal = false
        showRemoveModal = false
        // List
        userItems: Array<Item> = []
        allItems: Array<Item> = []

        currentItem: Item

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
                    "Authorization": GetJWTHeader()
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
                    "Authorization": GetJWTHeader()
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
            if(this.newItemName.length === 0 || this.newItemName.length > 20) {
                this.itemNameIsValid = false
                return
            } else {
                this.itemNameIsValid = true
            }
            if(!validNaturalNum(this.newItemPrice) || Number(this.newItemPrice) === 0) {
                this.itemPriceIsValid = false
                return
            } else {
                this.itemPriceIsValid = true
            }
            if(!validNaturalNum(this.memberDiscount) || (Number(this.newItemPrice) < Number(this.memberDiscount))) {
                this.memDiscountIsValid = false
                return
            } else {
                this.memDiscountIsValid = true
            }
            if(!validNaturalNum(this.newItemQuantity) || Number(this.newItemQuantity) === 0) {
                console.log(this.newItemQuantity)
                this.itemQuantityIsValid = false
                return
            } else {
                this.itemQuantityIsValid = true
            }
            fetch("/api/item", {
                method: "POST",
                headers: {
                    "Authorization": GetJWTHeader(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_name: this.newItemName,
                    price: this.newItemPrice,
                    member_price: Number(this.newItemPrice) - Number(this.memberDiscount),
                    quantity: this.newItemQuantity,
                })
            }).then(r => {
                    if(r.ok) {
                        this.fetchError = ""
                        this.showAddModal = false
                        this.switchUserList()
                    } else {
                        this.fetchError = r.statusText
                    }
                },
                err => {
                this.fetchError = "ネットワークエラーが発生しました"
                console.log(err)
            })
        }

        openEditItemModal(item: Item) {
            this.currentItem = item
            this.showEditModal = true
        }

        openRemoveItemModal(item: Item) {
            this.currentItem = item
            this.showRemoveModal = true
        }

        editItem() {
            fetch("/api/item/" + this.currentItem.id, {
                method: "PUT",
                headers: {
                    "Authorization": GetJWTHeader(),
                },
                body: JSON.stringify({
                    item_name: this.newItemName,
                    price: this.newItemPrice,
                    member_price: Number(this.newItemPrice) - Number(this.memberDiscount),
                    quantity: this.newItemQuantity,
                })
            }).then(r => {
                if(r.ok) {
                    this.showEditModal = false
                    this.switchUserList()
                }
            })
        }

        removeItem() {
            fetch("/api/item/" + this.currentItem.id, {
                method: "DELETE",
                headers: {
                    "Authorization": GetJWTHeader(),
                }
            }).then(r => {
                if(r.ok) {
                    this.showRemoveModal = false
                    this.switchUserList()
                }
            })
        }
    }

    function validNaturalNum(data: string): boolean {
        if(/^\d.*$/.test(data)) {
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

    .edit-btn, .remove-btn, .cancel-btn
        margin 0 20px 0

    input.form-control
        width 100%

    th > span.glyphicon
        cursor pointer
        margin 0 4px 0

    th > span.glyphicon:hover
        color rgba(0, 0, 0, .5)

    /*span.glyphicon.glyphicon-circle-arrow-right*/
        /*size 20px*/
        /*height 20px*/
        /*margin auto*/

    // TODO 矢印を上下中央に合わせる
    .editModalArrow
        height 300px
        display table-cell
        vertical-align middle

</style>
