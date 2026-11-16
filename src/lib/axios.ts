import { authStore } from '@/store/auth'
import { create, AxiosError } from 'axios'

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dummyjson.com'

const axios = create({
  baseURL: `${API_URL}/`,
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

// REQUEST: sisipkan token dari store (kalau ada)
axios.interceptors.request.use(
  (req) => {
    const token = authStore.getState().token

    if (token) req.headers.Authorization = `Bearer ${token}`

    if (__DEV__) console.log(`[API] ${req.method?.toUpperCase()} ${req.baseURL}${req.url}`)

    return req
  },
  (error) => Promise.reject(error),
)

// RESPONSE: logout otomatis kalau 401
axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) authStore.getState().logout()

    if (__DEV__) console.log('[API ERROR]', error.response?.status, error.response?.data?.message)

    return Promise.reject(error)
  },
)

// Ambil pesan error yang ramah dari error axios
export const getErrorMessage = (error: unknown) => {
  const err = error as AxiosError<{ message?: string }>

  return err?.response?.data?.message || err?.message || 'Terjadi kesalahan'
}

export default axios
