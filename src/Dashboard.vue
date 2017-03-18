<template>
  <div>
    <app-navbar></app-navbar>
    <div>You are logging in as {{ jwt.username }}</div>
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

    jwt = auth.GetToken() as auth.JWT

    logout() {
      auth.RemoveToken()
      router.push("/login")
    }
  }
</script>
