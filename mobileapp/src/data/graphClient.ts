import { ApolloClient, InMemoryCache } from '@apollo/client'
import config from '../../config'

const { app: AppConfig } = config

const graphClient = new ApolloClient({
  uri: AppConfig.graphUrl,
  cache: new InMemoryCache({
    // TODO: Update policies for new endpoint
    typePolicies: {
      Query: {
        fields: {
          nouns: {
            merge(existing, incoming) {
              let nounsActiveMarket = {}
              // Merge existing and incoming data
              if (existing && existing.nounsActiveMarket) {
                nounsActiveMarket = {
                  ...nounsActiveMarket,
                  ...existing.nounsActiveMarket
                }
              }
              if (incoming && incoming.nounsActiveMarket) {
                nounsActiveMarket = {
                  ...nounsActiveMarket,
                  ...incoming.nounsActiveMarket
                }
              }
              // Return merged result
              return {
                ...incoming,
                nounsActiveMarket
              }
            }
          }
        }
      },
      NounsBuilderAuction: {
        keyFields: ['address']
      }
    }
  })
})

export default graphClient
