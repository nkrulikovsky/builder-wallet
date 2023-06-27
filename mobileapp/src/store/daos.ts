import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { daosGroupStorage } from '../storage/sharedStorage'
import { zustandStorage } from '../storage/zustand'
import Toast from 'react-native-toast-message'
import { track } from '../utils/track'

const showErrorToast = (text: string) => {
  Toast.show({
    type: 'error',
    text1: text
  })
}

export type SavedDao = {
  address: string
  name: string
}

interface DaosState {
  saved: SavedDao[]
  save: (dao: SavedDao) => Promise<void>
  saveMultiple: (daos: SavedDao[]) => Promise<void>
  removeFromSaved: (address: string) => Promise<void>
}

export const useDaosStore = create<DaosState>()(
  persist(
    (set, get) => ({
      saved: [],
      save: async (dao: SavedDao) => {
        const saved = get().saved
        if (!saved.find(a => a.address === dao.address)) {
          const newSaved = [dao, ...saved]

          set({ saved: newSaved })

          try {
            await daosGroupStorage.setItem('saved', newSaved)

            track('Save DAO', { Dao: dao.name })
          } catch {
            showErrorToast(`Couldn't save ${dao.name}`)
            set({ saved: saved })
          }
        }
      },
      saveMultiple: async (daos: SavedDao[]) => {
        const saved = get().saved
        let newDaos = []

        for (const dao of daos) {
          if (!saved.find(a => a.address === dao.address)) {
            newDaos.push(dao)
          }
        }
        if (newDaos.length === 0) return

        let newSaved = [...saved, ...newDaos]
        set({ saved: newSaved })
        try {
          await daosGroupStorage.setItem('saved', newSaved)
        } catch {
          showErrorToast(`Couldn't save daos from wallet`)
          set({ saved: saved })
        }
      },
      removeFromSaved: async (address: string) => {
        const saved = get().saved
        const newSaved = saved.filter(a => a.address !== address)

        set({ saved: newSaved })
        try {
          await daosGroupStorage.setItem('saved', newSaved)
        } catch {
          showErrorToast(`Couldn't remove the dao from saved`)
          set({ saved: saved })
        }
      }
    }),
    {
      name: 'daos',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
