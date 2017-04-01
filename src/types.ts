export interface NavMenu {
    val: string
    path: string
    adminOnly: boolean
}

export interface Item {
    id: number
    item_name: string
    price: number
    member_price: number
    quantity: number
    user_id: number
}

export interface Order {
    id: number
    item_id: number
    item_name: string
    price: number
    quantity: number
    user_id: number
    datetime: number
}

export type TabMenu = "user" | "all"
