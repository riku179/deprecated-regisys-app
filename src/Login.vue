<template lang="pug" src="./template/Login.pug"></template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {router} from "./router"
    import {SetToken,GenBasicHeader} from "./lib/auth"
    import "whatwg-fetch"

    @Component
    export default class LoginApp extends Vue {
        username = ""
        password = ""
        isMember = true
        btnDisable = false

        send() {
            console.log('clicked!')
            this.btnDisable = true
            fetch('/api/token?is_member=' + this.isMember, {
                method: "GET",
                headers: {
                    "Authorization": GenBasicHeader(this.username, this.password)
                }
            }).then(r => {
                if (r.ok) {
                    let rawHeader = r.headers.get("Authorization")
                    if (rawHeader != null) {
                        SetToken(rawHeader.split(' ')[1])
                    }
                    router.push("/dashboard")
                } else if (r.status == 401) {
                    alert("認証に失敗しました")
                }
            }).then(() => {
                this.btnDisable = false
            })
        }
    }

</script>
