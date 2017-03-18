<template>
  <li :class="isActive" :display="isDisplay"><router-link :to="menu.path">{{ menu.val }}</router-link></li>
</template>

<script lang="ts">
  import Vue from "vue"
  import Component from "vue-class-component"
  import {Prop} from "vue-property-decorator"
  import {IMenu} from "../types"
  import * as auth from "../lib/auth"

  @Component
  export default class MenuItem extends Vue {
    @Prop
    menu: IMenu

    isActive() {
      return { active: (this.menu.path == this.$route.path) }
    }

    isDisplay() {
      if (this.menu.adminOnly) {
        let jwt = auth.GetToken() as auth.JWT
        return jwt.isRegister
      } else {
        return true
      }
    }
  }
</script>
