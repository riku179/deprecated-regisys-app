<template>
    <div>
        <div>You are logging in as {{ username }}</div>
        <button @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import {router} from './router'
    import * as auth from './lib/auth'
    import 'whatwg-fetch'

    @Component
    export default class DashboardApp  extends Vue {

        get username(): string {
            let jwt = auth.GetToken() as auth.JWT
            return jwt.username
        }

        logout() {
            auth.RemoveToken()
            router.push("/login")
        }
    }

</script>
