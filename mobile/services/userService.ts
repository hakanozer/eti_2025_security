import { IUser, IUserMe } from "../models/IUser"
import apiClient from "./apiConfig"

export const userLogin = (email: string, password: string) => {
    const sendObj = {
        email: email,
        password: password
    }
    return apiClient.post<IUser>('auth/login', sendObj)
}

export const userLogout = () => {
    return apiClient.post('auth/logout')
}

export const userMe = () => {
    return apiClient.get<IUserMe>('profile/me')
}