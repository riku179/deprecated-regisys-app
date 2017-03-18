<template lang="pug">
    .container
        app-navbar
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import 'whatwg-fetch'

    @Component
    export default class DashboardApp  extends Vue {
    }
</script>
