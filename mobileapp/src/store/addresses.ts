import { create } from 'zustand'

interface AddressesState {
  connectedAddress: String | undefined
  manualAddresses: String[]
  setConnectedAddress: (address: String | undefined) => void
  addManualAddress: (address: String) => void
  removeManualAddress: (address: String) => void
}

export const useAddressesStore = create<AddressesState>()((set, get) => ({
  connectedAddress: undefined,
  manualAddresses: [],
  setConnectedAddress: (address: String | undefined) =>
    set({ connectedAddress: address }),
  addManualAddress: (address: String) =>
    set({ manualAddresses: [...get().manualAddresses, address] }),
  removeManualAddress: (address: String) =>
    set({
      manualAddresses: get().manualAddresses.filter(
        manualAddress => manualAddress !== address
      )
    })
}))
