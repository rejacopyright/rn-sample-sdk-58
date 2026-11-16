import { authStore } from '@/store/auth'
import { create, AxiosError } from 'axios'

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dummyjson.com'

const axios = create({
  baseURL: `${API_URL}/`,
  timeout: 15000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

// REQUEST: attach the token from the store (if any)
axios.interceptors.request.use(
  (req) => {
    const token = authStore.getState().token

    if (token) req.headers.Authorization = `Bearer ${token}`

    if (__DEV__) console.log(`[API] ${req.method?.toUpperCase()} ${req.baseURL}${req.url}`)

    return req
  },
  (error) => Promise.reject(error),
)

// RESPONSE: log out automatically on 401
axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) authStore.getState().logout()

    if (__DEV__) console.log('[API ERROR]', error.response?.status, error.response?.data?.message)

    return Promise.reject(error)
  },
)

// Extract a friendly message from an axios error
export const getErrorMessage = (error: unknown) => {
  const err = error as AxiosError<{ message?: string }>

  return err?.response?.data?.message || err?.message || 'Something went wrong'
}

export default axios
