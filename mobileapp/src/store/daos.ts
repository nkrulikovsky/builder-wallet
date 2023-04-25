import { create } from 'zustand'

export type SavedDao = {
  address: string
  name: string
}

interface DaosState {
  saved: SavedDao[]
  save: (address: SavedDao) => void
  removeFromSaved: (address: string) => void
}

export const useDaosStore = create<DaosState>()((set, get) => ({
  saved: [],
  save: (address: SavedDao) => {
    const saved = get().saved
    if (!saved.includes(address)) {
      set({ saved: [...saved, address] })
    }
  },
  removeFromSaved: (address: string) => {
    const saved = get().saved
    set({ saved: saved.filter(a => a.address !== address) })
  }
}))
