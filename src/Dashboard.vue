<template>
    <div>
        <div>You are logging in as {{ jwt.username }}</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import * as auth from './lib/auth'
    import 'whatwg-fetch'

    @Component
    export default class DashboardApp  extends Vue {
        jwt: auth.JWT

        constructor() {
            super()
            let jwt = auth.GetToken()
            if (jwt != null) {
                this.jwt = jwt
            }
        }
    }

</script>
