import { create } from 'zustand'

interface AddressesState {
  connectedAddress: String | undefined
  setConnectedAddress: (address: String | undefined) => void
}

export const useAddressesStore = create<AddressesState>()((set, get) => ({
  connectedAddress: undefined,
  setConnectedAddress: (address: String | undefined) =>
    set({ connectedAddress: address })
}))
