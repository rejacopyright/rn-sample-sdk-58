import { create } from 'zustand'

type FilterState = {
  category?: string
  setCategory: (category?: string) => void
}

// Product filter shared between the list screens and the category sheet
export const filterStore = create<FilterState>()((set) => ({
  category: undefined,
  setCategory: (category) => set({ category }),
}))
