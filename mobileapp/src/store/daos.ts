import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'
import { mmkvStorage } from '../storage/mmkv'
import { daosGroupStorage } from '../storage/sharedStorage'

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value)
  },
  getItem: name => {
    const value = mmkvStorage.getString(name)
    return value ?? null
  },
  removeItem: name => {
    return mmkvStorage.delete(name)
  }
}

export type SavedDao = {
  address: string
  name: string
}

interface DaosState {
  saved: SavedDao[]
  save: (address: SavedDao) => void
  removeFromSaved: (address: string) => void
}

export const useDaosStore = create<DaosState>()(
  persist(
    (set, get) => ({
      saved: [],
      save: (dao: SavedDao) => {
        const saved = get().saved
        if (!saved.includes(dao)) {
          const newSaved = [dao, ...saved]

          set({ saved: newSaved })
          daosGroupStorage.setItem('saved', newSaved)
        }
      },
      removeFromSaved: (address: string) => {
        const saved = get().saved
        const newSaved = saved.filter(a => a.address !== address)

        set({ saved: newSaved })
        daosGroupStorage.setItem('saved', newSaved)
      }
    }),
    {
      name: 'daos',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
