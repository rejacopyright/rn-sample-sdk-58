import { asyncStorage } from '@/lib/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  user: Record<string, any> | null
  setAuth: (params: { token: string; user: Record<string, any> }) => void
  logout: () => void
}

// Penamaan tanpa prefix "use": authStore (bukan useAuth)
// Di komponen : const token = authStore((s) => s.token)
// Di luar React: authStore.getState().token
export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    { name: 'auth', storage: asyncStorage },
  ),
)
