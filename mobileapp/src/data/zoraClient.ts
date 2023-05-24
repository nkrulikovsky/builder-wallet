import { ApolloClient, InMemoryCache } from '@apollo/client'

const zoraClient = new ApolloClient({
  uri: 'https://api.zora.co/graphql',
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
