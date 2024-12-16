import type { ProductCreate, ProductUpdate } from "~/models/product.model"
import { client } from "./httpClient"

export const getProductList = () => {
    return client({
        url: "/products",
        method: "get",
    })
}

export const getProductById = (id: any) => {
    return client({
        url: `/products/${id}`,
        method: "get",
    })
}

export const updateProduct = (id: any, data: ProductUpdate) => {
    return client({
        url: `/products/${id}`,
        method: "put",
        data: data,
    })
}

export const addProduct = (data: ProductCreate) => {
    return client({
        url: `/products`,
        method: "post",
        data: data,
    })
}

export const deleteProduct = (id: any) => {
    return client({
        url: `/products/${id}`,
        method: "delete",
    })
}

