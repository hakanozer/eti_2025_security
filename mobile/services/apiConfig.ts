import axios from 'axios'
import { Platform } from 'react-native'

const baseURL = 'https://jsonbulut.com/api/'
const timeout = 10000 // 10 sn

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    data: {"platform": Platform.OS, "version": Platform.Version}
})

export default apiClient