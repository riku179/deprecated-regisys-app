const KEY = "regisys_jwt_key"

export class JWT {
    exp: number
    isRegister: boolean
    iat: number
    isMember: boolean
    scopes: string
    sub: number
    username: string

    constructor(token: string) {
        let obj = JSON.parse(
            window.atob(
                token.split(".")[1]
                    .replace("-", "+")
                    .replace("_", "/")
            )
        )
        this.exp = obj.exp
        this.isRegister = obj.is_register
        this.iat = obj.iat
        this.isMember = obj.is_member
        this.scopes = obj.scopes
        this.sub = obj.sub
        this.username = obj.user_name
    }

    isValid (): boolean {
        console.log("[isValid] " + this.exp)
        return Date.now() / 1000 < this.exp
    }
}

export function GetToken(): null | JWT {
    let token = sessionStorage.getItem(KEY)
    if (token === null) {
        return null
    } else {
        return new JWT(token)
    }
}

export function SetToken(token: string) {
    sessionStorage.setItem(KEY, token)
}

export function RemoveToken() {
    sessionStorage.removeItem(KEY)
}

export function GenBasicHeader(username: string, password: string) {
    return "Basic " + window.btoa(username + ":" + password)
}