<template lang="pug" src="./template/Modal.pug"></template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class Modal extends Vue {
        name = "modal"
    }
</script>

<style>
    .vuemodal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .vuemodal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .vuemodal-container {
        width: 300px;
        margin: 0 auto;
        padding: 20px 30px;
    }

    .vuemodal-container {
        width: 300px;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .vuemodal-container #close {
        color: #42b983;
        cursor: pointer;
    }

    .vuemodal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .vuemodal-body {
        margin: 20px 0;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .vuemodal-container,
    .modal-leave-active .vuemodal-container {
        -webkit-transform: scale(1, 1);
        -moz-transform: scale(1, 1);
        -ms-transform: scale(1, 1);
        -o-transform: scale(1, 1);
        transform: scale(1, 1);
    }
</style>
