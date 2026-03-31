// const DEFAULT_API_BASE_URL = 'http://127.0.0.1:8892/api/shinmeikaieasy/v1'
const DEFAULT_API_BASE_URL = 'https://weapi.51mi.top/api/shinmeikaieasy/v1'
const DEFAULT_API_TOKEN = '90998b02-5d1b-4279-906d-6bd14b9ed8c50'
const DEFAULT_API_TIMEOUT = 60000

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
export const API_TOKEN = import.meta.env.VITE_API_TOKEN || DEFAULT_API_TOKEN
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || DEFAULT_API_TIMEOUT)
