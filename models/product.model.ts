export interface Products {
    id: number
    name: string
    detail: string
    price: number
    amount: number
    img: string
}

export interface Category {
    name: string
    type: string
    products: Products[]
}

export interface ProductCreate {
    title: string
    price: number
    description: string
    image: string
    category:string
}

export interface ProductRes {
    id: number
    title: string
    price: number
    description: string
    image: string
    category:string
}

export interface ProductUpdate {
    id: number
    title: string
    price: number
    description: string
    image: string
    category:string
}

export interface Cate {
    id: number
    name: string
    image: string
    path: string
    active: boolean
}
