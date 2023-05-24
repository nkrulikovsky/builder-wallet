import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'

interface AddressesState {
  connectedAddress: String | undefined
  manualAddresses: String[]
  setConnectedAddress: (address: String | undefined) => void
  addManualAddress: (address: String) => void
  removeManualAddress: (address: String) => void
}

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set, get) => ({
      connectedAddress: undefined,
      manualAddresses: [],
      setConnectedAddress: (address: String | undefined) =>
        set({ connectedAddress: address }),
      addManualAddress: (address: String) => {
        const addresses = get().manualAddresses

        if (!addresses.includes(address)) {
          set({ manualAddresses: [...addresses, address] })
        }
      },
      removeManualAddress: (address: String) =>
        set({
          manualAddresses: get().manualAddresses.filter(
            manualAddress => manualAddress !== address
          )
        })
    }),
    {
      name: 'daos',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
