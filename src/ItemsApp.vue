<template lang="pug">
    .container
        app-navbar
        h2 Items
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    @Component
    export default class ItemsApp extends Vue {
    }
</script>
