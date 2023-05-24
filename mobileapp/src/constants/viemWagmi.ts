import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient
})
