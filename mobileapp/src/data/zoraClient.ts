import { ApolloClient, InMemoryCache } from '@apollo/client'
import config from '../../config'

const { app: AppConfig } = config

const zoraClient = new ApolloClient({
  uri: AppConfig.zoraUrl,
  cache: new InMemoryCache({
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

export default zoraClient
