export const ANKR_RPC_URL = process.env.ANKR_RPC_URL!
export const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL!
export const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL!

type AppConfig = {
  zoraUrl: string
  imageEndpoint: string
  daosAppGroup: string
}

const app: AppConfig = {
  zoraUrl: 'https://api.zora.co/graphql',
  imageEndpoint: 'https://api.builderwidgets.wtf/image',
  daosAppGroup: 'group.com.nouns.ng.builder.daos'
}

const config = {
  app: app
}

export default config
