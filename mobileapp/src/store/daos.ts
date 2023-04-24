import { create } from 'zustand'

interface DaosState {
  saved: string[]
  save: (address: string) => void
  removeFromSaved: (address: string) => void
}

const useDaosStore = create<DaosState>()((set, get) => ({
  saved: [],
  save: (address: string) => {
    const saved = get().saved
    if (!saved.includes(address)) {
      set({ saved: [...saved, address] })
    }
  },
  removeFromSaved: (address: string) => {
    const saved = get().saved
    set({ saved: saved.filter(a => a !== address) })
  }
}))

export { useDaosStore }
