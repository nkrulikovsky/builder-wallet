type ContractAddresses = {
  nounsToken: `0x${string}`
  lilNounsToken: `0x${string}`
}

type AppConfig = {
  zoraUrl: string
  subgraph: string
}

const app: AppConfig = {
  zoraUrl: 'https://api.zora.co/graphql',
  subgraph:
    'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-ethereum-mainnet/stable/gn'
}

const addresses: ContractAddresses = {
  nounsToken: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
  lilNounsToken: '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B'
}

const config = {
  app: app,
  addresses: addresses
}

export default config
