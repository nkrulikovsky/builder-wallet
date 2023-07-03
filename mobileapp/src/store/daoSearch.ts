import { create } from 'zustand'

export type SearchDao = {
  address: string
  name: string
}

export enum DaoSearchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
}

interface DaoSearchState {
  active: boolean
  searchStatus: DaoSearchStatus
  searchResults: SearchDao[]
  focusRequested: boolean
  setActive: (active: boolean) => void
  setSearchStatus: (status: DaoSearchStatus) => void
  setSearchResults: (results: SearchDao[]) => void
  clearSearchResults: () => void
  setFocusRequested: (focusRequested: boolean) => void
  addToSearchResults: (results: SearchDao[]) => void
}

export const useDaoSearchStore = create<DaoSearchState>()((set, get) => ({
  active: false,
  searchStatus: DaoSearchStatus.IDLE,
  searchResults: [],
  focusRequested: false,
  setActive: (active: boolean) => {
    if (active) {
      set({ active })
    } else {
      set({ active, searchStatus: DaoSearchStatus.IDLE, searchResults: [] })
    }
  },
  setSearchStatus: (status: DaoSearchStatus) => {
    set({ searchStatus: status })
  },
  setSearchResults: (results: SearchDao[]) => {
    set({ searchResults: results })
  },
  addToSearchResults: (results: SearchDao[]) => {
    set({ searchResults: [...get().searchResults, ...results] })
  },
  clearSearchResults: () => {
    set({ searchResults: [] })
  },
  setFocusRequested: (focusRequested: boolean) => {
    set({ focusRequested })
  }
}))
