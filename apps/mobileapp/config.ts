type AppConfig = {
  graphUrl: string
  imageEndpoint: string
  daosAppGroup: string
}

const app: AppConfig = {
  graphUrl:
    'https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet',
  imageEndpoint: 'https://api.builderapp.wtf/image',
  daosAppGroup: 'group.com.nouns.ng.builder.daos'
}

const config = {
  app: app
}

export default config
