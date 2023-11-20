type AppConfig = {
  graphUrl: string
  imageEndpoint: string
  daosAppGroup: string
}

const app: AppConfig = {
  graphUrl: 'https://api.zora.co/graphql',
  imageEndpoint: 'https://api.builderapp.wtf/image',
  daosAppGroup: 'group.com.nouns.ng.builder.daos'
}

const config = {
  app: app
}

export default config
