<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/dashboard">Regisys</router-link>
      </div>
      <div class="collapse navbar-collapse" id="menu">
        <ul class="nav navbar-nav" v-if="login">
            <li is="menu-item" v-for="(menu, index) in menus" :key="menu" :menu="menu"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import Vue from "vue"
  import Component from "vue-class-component"
  import MenuItem from "./MenuItem.vue"
  import {Prop} from "vue-property-decorator"
  import {IMenu} from "../types"

  @Component({
    components: {
      "menu-item": MenuItem
    }
  })
  export default class NavbarApp extends Vue {
    @Prop
    loginInit: boolean

    login = typeof this.loginInit === "undefined" // default true

    menus = [
        { val: "商品", path: "/goods", adminOnly: false},
        { val: "売上", path: "/orders", adminOnly: false},
        { val: "ユーザー", path: "/users", adminOnly: false},
        { val: "会計", path: "/register", adminOnly: true},
      ] as Array<IMenu>
  }
</script>
