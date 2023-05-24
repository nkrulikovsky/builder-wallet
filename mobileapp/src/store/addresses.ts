import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'

interface AddressesState {
  connectedAddress: string | undefined
  manualAddresses: string[]
  setConnectedAddress: (address: string | undefined) => void
  addManualAddress: (address: string) => void
  removeManualAddress: (address: string) => void
}

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set, get) => ({
      connectedAddress: undefined,
      manualAddresses: [],
      setConnectedAddress: (address: string | undefined) =>
        set({ connectedAddress: address }),
      addManualAddress: (address: string) => {
        const addresses = get().manualAddresses

        if (!addresses.includes(address)) {
          set({ manualAddresses: [...addresses, address] })
        }
      },
      removeManualAddress: (address: string) =>
        set({
          manualAddresses: get().manualAddresses.filter(
            manualAddress => manualAddress !== address
          )
        })
    }),
    {
      name: 'addresses',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
