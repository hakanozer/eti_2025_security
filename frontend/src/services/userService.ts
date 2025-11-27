import { IUser } from "../models/IUser"
import apiConfig from "./apiConfig"

export const userLogin = (email: string, password: string) => {
    const sendObj = {
        email: email,
        password: password
    }
    return apiConfig.post<IUser>('auth/login', sendObj)
}

export const userProfile = () => {
    return apiConfig.get('profile/me')
}