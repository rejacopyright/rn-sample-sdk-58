import { asyncStorage } from '@/lib/storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavoriteState = {
  ids: number[]
  toggle: (id: number) => void
  clear: () => void
}

export const favoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id] })),
      clear: () => set({ ids: [] }),
    }),
    { name: 'favorite', storage: asyncStorage },
  ),
)
