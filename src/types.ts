export interface IMenu {
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
