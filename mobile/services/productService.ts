import { IAllProducts, ISingleProduct } from "../models/IAllProducts"
import apiClient from "./apiConfig"

export const allProducts = (page: number) => {
    const sendData = {
        page: page,
        per_page: 10
    }
    return apiClient.get<IAllProducts>('products', {params: sendData})
}

export const singleProduct = (id: number) => {
    return apiClient.get<ISingleProduct>('products/'+id)
}