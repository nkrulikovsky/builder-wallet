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
  searchStatus: DaoSearchStatus
  searchResults: SearchDao[]
  setSearchStatus: (status: DaoSearchStatus) => void
  setSearchResults: (results: SearchDao[]) => void
  clearSearchResults: () => void
}

export const useDaoSearchStore = create<DaoSearchState>()((set, get) => ({
  searchStatus: DaoSearchStatus.IDLE,
  searchResults: [],
  setSearchStatus: (status: DaoSearchStatus) => {
    set({ searchStatus: status })
  },
  setSearchResults: (results: SearchDao[]) => {
    set({ searchResults: results })
  },
  clearSearchResults: () => {
    set({ searchResults: [] })
  }
}))
