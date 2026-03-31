import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import { API_BASE_URL, API_TIMEOUT, API_TOKEN } from '../config/apiConfig'

const NETWORK_ERROR_MESSAGE = '网络异常，请稍后重试'
const UNAUTHORIZED_MESSAGE = '认证失败，请联系管理员或更新 token'
const DEFAULT_ERROR_MESSAGE = '请求失败，请稍后重试'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
})

apiClient.interceptors.request.use((config) => {
  const token = API_TOKEN
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (!error.response) {
      message.error(NETWORK_ERROR_MESSAGE)
      return Promise.reject(error)
    }

    if (error.response.status === 401) {
      message.error(UNAUTHORIZED_MESSAGE)
      return Promise.reject(error)
    }

    const serverMessage = error.response.data?.message
    message.error(serverMessage || DEFAULT_ERROR_MESSAGE)
    return Promise.reject(error)
  },
)

export default apiClient
