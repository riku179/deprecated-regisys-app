<template lang="pug" src="./template/ItemsApp.pug"></template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {Item, TabMenu} from "./types"
    import {GetJWTHeader} from "./lib/auth"
    import * as auth from "./lib/auth"
    import "whatwg-fetch"

    @Component
    export default class ItemsApp extends Vue {
        // タブメニュー
        menu: TabMenu = "user"
        // Modal
        showAddModal = false
        showEditModal = false
        showRemoveModal = false

        userItems: Array<Item> = []
        allItems: Array<Item> = []

        // 編集中のItem
        currentItem: Item

        jwt = auth.GetToken() as auth.JWT
        // Form
        formItemName: string
        formItemPrice: string
        formMemberDiscount: string
        formItemQuantity: string
        // Validationフラグ
        itemNameIsValid = true
        itemPriceIsValid = true
        memDiscountIsValid = true
        itemQuantityIsValid = true

        // lifecycle method
        created() {
            this.initForm()
            this.switchUserList()
        }

        // method
        switchUserList() {
            this.menu = "user"
            fetch("/api/item?user=" + this.jwt.sub, {
                method: "GET",
                headers: {
                    "Authorization": GetJWTHeader()
                }
            }).then(r => {
                if(r.ok) {
                    r.json().then(data => {
                        this.userItems = data as Array<Item>
                    })
                } else {
                    alert(r.statusText)
                }
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
                if(r.ok) {
                    r.json().then(data => {
                        this.allItems = data as Array<Item>
                    })
                } else {
                    alert(r.statusText)
                }
            })
        }

        addItem() {
            this.initForm()
            // TODO コンポーネント化
            if(this.formItemName.length === 0 || this.formItemName.length > 20) {
                this.itemNameIsValid = false
                return
            } else {
                this.itemNameIsValid = true
            }
            if(!validNaturalNum(this.formItemPrice) || Number(this.formItemPrice) === 0) {
                this.itemPriceIsValid = false
                return
            } else {
                this.itemPriceIsValid = true
            }
            if(!validNaturalNum(this.formMemberDiscount) || (Number(this.formItemPrice) < Number(this.formMemberDiscount))) {
                this.memDiscountIsValid = false
                return
            } else {
                this.memDiscountIsValid = true
            }
            if(!validNaturalNum(this.formItemQuantity) || Number(this.formItemQuantity) === 0) {
                console.log(this.formItemQuantity)
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
                    item_name: this.formItemName,
                    price: this.formItemPrice,
                    member_price: Number(this.formItemPrice) - Number(this.formMemberDiscount),
                    quantity: this.formItemQuantity,
                })
            }).then(r => {
                if(r.ok) {
                    this.showAddModal = false
                    this.switchUserList()
                } else {
                    alert(r.statusText)
                }
            })
        }

        openEditItemModal(item: Item) {
            this.initForm()
            this.currentItem = item
            this.showEditModal = true
        }

        openRemoveItemModal(item: Item) {
            this.currentItem = item
            this.showRemoveModal = true
        }

        editItem() {
            let body = {} as any
            if(this.formItemName != "") {
                body.item_name = this.formItemName
            }
            if(this.formItemPrice != "") {
                body.price = this.formItemPrice
            }
            if(this.formMemberDiscount != "0") {
                body.member_price = Number(this.formItemPrice) - Number(this.formMemberDiscount)
            }
            if(this.formItemQuantity != "") {
                body.quantity = this.formItemQuantity
            }
            fetch("/api/item/" + this.currentItem.id, {
                method: "PUT",
                headers: {
                    "Authorization": GetJWTHeader(),
                },
                body: JSON.stringify(body)
            }).then(r => {
                    if(r.ok) {
                        this.showEditModal = false
                        this.switchUserList()
                    } else {
                        alert(r.statusText)
                    }
                },
                err => {
                    alert("ネットワークエラーが発生しました")
                    console.log(err)
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
                    } else {
                        alert(r.statusText)
                    }
                },
                err => {
                    alert("ネットワークエラーが発生しました")
                    console.log(err)
                })
        }

        initForm() {
            this.formItemName = ""
            this.formItemPrice = ""
            this.formMemberDiscount = "0"
            this.formItemQuantity = ""
        }
    }

    function validNaturalNum(data: string): boolean {
        if(/^\d.*$/.test(data)) {
            return true
        } else {
            return false
        }
    }

</script>

<style lang="stylus">
    ul.nav.nav-tabs > li > a
        cursor pointer

    .container > button
        margin 5px
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

    .col-sm-6 > h4
        color: #428bca
</style>
