import { IProducts } from "../models/IProducts"
import apiConfig from "./apiConfig"

export const allProducts = () => {
    const sendObj = {
        page: 0,
        per_page: 10
    }
    return apiConfig.get<IProducts>('products', {params: sendObj})
}