<template lang="pug" src="./template/Modal.pug"></template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from "vue-property-decorator";

    @Component
    export default class Modal extends Vue {
        @Prop
        initWidth: number

        name = "modal"
        width = this.initWidth || 400
    }
</script>

<style lang="stylus">
    .cover-screen
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%

    .vuemodal-mask
        @extend .cover-screen
        z-index: 9997
        background-color: rgba(0, 0, 0, .5)
        display: table
        transition: opacity .3s ease

    .vuemodal-close-area
        @extend .cover-screen
        z-index: 9998

    .vuemodal-wrapper
        display: table-cell
        vertical-align: middle

    .vuemodal-container
        position: relative
        z-index: 9999
        width: 400px
        margin: 0 auto
        padding: 20px 30px
        background-color: #fff
        border-radius: 2px
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
        transition: all .3s ease
        font-family: Helvetica, Arial, sans-serif

    .close-btn
        cursor: pointer

    .close-btn:hover
        color rgba(0, 0, 0, .5)

    .vuemodal-header h3
        margin-top: 0
        color: #428bca

    .vuemodal-body
        margin: auto
        width 80%

    .vuemodal-footer
        margin auto
        width 80%
        text-align center

    // 以下vueのイベントフック
    .modal-enter, .modal-leave-active
        opacity: 0

    .modal-enter .vuemodal-container,
    .modal-leave-active .vuemodal-container
        -webkit-transform: scale(1, 1)
        -moz-transform: scale(1, 1)
        -ms-transform: scale(1, 1)
        -o-transform: scale(1, 1)
        transform: scale(1, 1)
</style>
