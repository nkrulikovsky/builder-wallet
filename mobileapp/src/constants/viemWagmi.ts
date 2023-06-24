import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ANKR_RPC_URL, BLOCKPI_RPC_URL, ALCHEMY_RPC_URL } from '@env'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: chain => ({
        http: ANKR_RPC_URL
      })
    }),
    jsonRpcProvider({
      rpc: chain => ({
        http: BLOCKPI_RPC_URL
      })
    }),
    jsonRpcProvider({
      rpc: chain => ({
        http: ALCHEMY_RPC_URL
      })
    }),
    publicProvider()
  ]
)

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient
})
