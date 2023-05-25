import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

//TODO: Add own providers
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient
})
