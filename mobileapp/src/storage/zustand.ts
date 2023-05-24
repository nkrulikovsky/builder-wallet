import { StateStorage } from 'zustand/middleware/persist'
import { mmkvStorage } from './mmkv'

export const zustandStorage: StateStorage = {
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
