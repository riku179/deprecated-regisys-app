<template lang="pug">
    li(:class="{ active: isActive }", :style="{ display: isDisplay }")
        router-link(:to="menu.path") {{ menu.val }}
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

        get isActive() {
            return this.menu.path === this.$route.path
        }

        get isDisplay() {
            if (this.menu.adminOnly) {
                let jwt = auth.GetToken() as auth.JWT
                return jwt.isRegister ? '' : 'none'
            } else {
                return ''
            }
        }
    }
</script>
