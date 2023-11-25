import { ApolloClient, InMemoryCache } from '@apollo/client'
import config from '../../config'

const { app: AppConfig } = config

const graphClient = new ApolloClient({
  uri: AppConfig.graphUrl,
  cache: new InMemoryCache()
})

export default graphClient
